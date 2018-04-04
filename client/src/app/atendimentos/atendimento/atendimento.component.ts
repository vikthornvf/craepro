import { MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AtendimentoService } from '../atendimento.service';
import { ProfessorService } from '../../professores/professor.service';
import { AlunoService } from '../../alunos/aluno.service';
import { Atendimento } from '../atendimento.model';
import { Professor } from '../../professores/professor.model';
import { Aluno } from '../../alunos/aluno.model';
import { Enums } from '../../shared/enums';
import { Parecer } from '../parecer.model';
import { ToastService } from '../../shared/toast.service';

declare var $;

@Component({
	selector: 'app-atendimento',
	templateUrl: './atendimento.component.html'
})
export class AtendimentoComponent implements OnInit {

	@ViewChild('deleteConfirmModal') deleteConfirmModal;
	@Input() create = false;
	@Input() innerAlunoComponent = false;
	@Input() selectedId: string;
	@Input() atendimento: Atendimento;
	@Output() save = new EventEmitter<Atendimento>();
	@Output() delete = new EventEmitter<string>();

	professores: Professor[];
	professor: Professor;
	aluno: Aluno;
	pareceres: FormArray = this.fb.array([]);
	showPareceres = false;

	form: FormGroup;
	tipos: {}[] = Enums.Atts;
	dias: {}[] = Enums.Dias;

	nomeTimeout;
	nomeActions = new EventEmitter<string|MaterializeAction>();
	nomeParams = [{
		belowOrigin: true,
		hover: false
	}];
	horarioActions = new EventEmitter<string|MaterializeAction>();
	timepickerParams = [{
		twelvehour: false,
		cleartext: 'Limpar',
		canceltext: 'Cancelar',
		container: 'body'
	}];
	datepickerParams = [{
		monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		format: 'dd/mm/yyyy',
		today: 'Hoje',
		clear: 'Limpar',
		container: 'body'
	}];

	constructor(
		private service: AtendimentoService,
		private professorService: ProfessorService,
		private alunoService: AlunoService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		if (this.create) {
			this.atendimento = new Atendimento();
			this.atendimento.solicitacao = new Date();
			this.atendimento.pareceres = [];
			this.loadParent();
		} else {
			this.aluno = this.atendimento.aluno;
			this.professor = this.atendimento.profissional;
		}
		this.initForm();
	}

	initForm(): void {
		this.form = this.fb.group({
			'nome': null,
			'tipo': null,
			'horario': this.fb.group({
				'dia': null,
				'horario': null,
			}),
			'pareceres': this.pareceres
		});

		const a = this.atendimento;
		if (a) {
			this.form.patchValue({
				'nome': this.professor ? this.professor.nome : null,
				'autoComplete': null,
				'tipo': a.tipo,
				'horario': a.horario,
			});
			this.pareceres = this.form.get('pareceres') as FormArray;
			a.pareceres.forEach(parecer => this.pareceres.insert(0, this.createParecer(parecer)));
		}
	}

	onShowDropdown(key: string): void {
		if (key === 'Enter') {
			this.selectProfessor();
		}
		clearTimeout(this.nomeTimeout);
		this.nomeTimeout = setTimeout(() => {
			this.loadProfessores();
		}, 350);
		$('#nome_att').dropdown('open');
	}

	selectProfessor(professor?: Professor): void {
		if (!professor && this.professores.length === 1) {
			professor = this.professores[0];
		}
		this.professor = professor;
		this.professores = null;
		this.form.patchValue({ nome: professor.nome });
		$('#nome_att').dropdown('close');
	}

	onSelectDiaSemana(dia: number): void {
		const inicio = new Date();
		inicio.setDate(inicio.getDate() + (((dia - 1) - inicio.getDay()) + 7) % 7 + 1);
		this.atendimento.inicio = inicio;
	}

	createParecer(parecer?: Parecer): FormGroup {
		return this.fb.group({
			texto: parecer ? parecer.texto : null,
			data: parecer ? parecer.data : null
		});
	}

	addParecer(): void {
		this.pareceres = this.form.get('pareceres') as FormArray;
		this.pareceres.insert(0, this.createParecer(new Parecer()));
		this.showPareceres = true;
	}

	removeParecer(i: number): void {
		this.pareceres.removeAt(i);
		this.showPareceres = true;
	}

	toggleShowParecer(): void {
		this.showPareceres = !this.showPareceres;
	}

	loadParent(): void {
		this.aluno = this.alunoService.findById(this.selectedId);
	}

	loadProfessores(): void {
		const nome = this.form.get('nome').value;
		const tipo = this.form.get('tipo').value;
		this.professores = this.professorService.listByNomeAndTipoAtendimento(nome, tipo);
	}

	iniciarAtendimento(): void {
		this.atendimento.inicio = new Date();
	}

	finalizarAtendimento(): void {
		this.atendimento.egresso = new Date();
	}

	continuarAtendimento(): void {
		this.atendimento.egresso = null;
	}

	onSave(): void {
		const att = this.atendimento;

		att.aluno = this.aluno;
		att.profissional = this.professor;
		att.tipo = this.form.get('tipo').value;
		att.horario = this.form.get('horario').value;
		att.pareceres = this.form.get('pareceres').value;
		att.pareceres.reverse();

		this.atendimento = this.service.save(att);
		this.save.emit(this.atendimento);
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			const _id = this.atendimento._id;
			// TODO
			this.service.delete(_id);
			this.delete.emit(_id);
		}
	}

	onConfirmDelete(): void {
		this.deleteConfirmModal.open();
	}
}
