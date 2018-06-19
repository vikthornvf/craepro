import { MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AtendimentoService } from '../atendimento.service';
import { ProfessorService } from '../../professores/professor.service';
import { AlunoService } from '../../alunos/aluno.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { Atendimento } from '../atendimento.model';
import { Professor } from '../../professores/professor.model';
import { Aluno } from '../../alunos/aluno.model';
import { Parecer } from '../parecer.model';
import { Enums } from '../../shared/enums';

declare var $;

@Component({
	selector: 'app-atendimento',
	templateUrl: './atendimento.component.html'
})
export class AtendimentoComponent implements OnInit {

	@Input() create = false;
	@Input() innerAlunoComponent = false;
	@Input() selectedId: string;
	@Input() atendimento: Atendimento;
	@Output() save = new EventEmitter<Atendimento>();
	@Output() delete = new EventEmitter<string>();

	att: Atendimento;
	professores: Professor[];
	professor: Professor;
	aluno: Aluno;
	pareceres: FormArray = this.fb.array([]);
	showPareceres = false;
	submitted = false;

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
		private dialogs: DialogsService,
		private service: AtendimentoService,
		private professorService: ProfessorService,
		private alunoService: AlunoService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		if (this.create) {
			this.att = new Atendimento();
			this.att.solicitacao = new Date();
			this.att.pareceres = [];
			this.loadParent();
		} else {
			this.att = Object.assign({}, this.atendimento);
			this.aluno = this.att.aluno;
			this.professor = this.att.profissional;
		}
		this.initForm();
		this.onChanges();
	}

	onChanges(): void {
		this.form.get('horario.dia').valueChanges.subscribe(dia => {
			this.onSelectDiaSemana(dia);
		});
	}

	initForm(): void {
		this.form = this.fb.group({
			'tipo': null,
			'nome': this.fb.control(null, this.validateIfHasInicio.bind(this)),
			'horario': this.fb.group({
				'dia': this.fb.control(null, this.validateIfHasInicio.bind(this)),
				'hora': this.fb.control(null, this.validateIfHasInicio.bind(this)),
			}),
			'pareceres': this.pareceres
		});

		const a = this.att;
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
		if (this.professores && this.professores.length === 1) {
			professor = this.professores[0];
		}
		if (professor) {
			this.professor = professor;
			this.professores = null;
			this.form.patchValue({ nome: professor.nome });
			$('#nome_att').dropdown('close');
		}
	}

	onSelectDiaSemana(dia: number): void {
		const inicio = new Date();
		inicio.setDate(inicio.getDate() + (((dia - 1) - inicio.getDay()) + 7) % 7 + 1);
		this.att.inicio = inicio;
	}

	createParecer(parecer?: Parecer): FormGroup {
		return this.fb.group({
			'texto': parecer ? parecer.texto : null,
			'usuario': parecer ? parecer.usuario : null,
			'data': parecer ? parecer.data : null
		});
	}

	addParecer(): void {
		const parecer = new Parecer();
		const usuario = JSON.parse(localStorage.getItem('craepro-token'));
		parecer.usuario = usuario.nome;

		this.pareceres = this.form.get('pareceres') as FormArray;
		this.pareceres.insert(0, this.createParecer(parecer));
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
		this.att.inicio = new Date();
	}

	finalizarAtendimento(): void {
		this.att.egresso = new Date();
		this.updateDynamicValidators();
	}

	continuarAtendimento(): void {
		this.att.egresso = null;
		this.updateDynamicValidators();
	}

	onSave(): void {
		if (this.form.invalid) {
			this.submitted = true;
			// update dropdown state
			$(document).ready(function() {
				$('select').material_select();
			});

			this.dialogs.toastFail('Preencha todos os campos obrigatórios para salvar.');
			return;
		}

		this.atendimento = this.att;
		const att = this.atendimento;

		att.aluno = this.aluno;
		att.profissional = this.professor;
		att.tipo = this.form.get('tipo').value;
		att.horario = this.form.get('horario').value;
		att.pareceres = this.form.get('pareceres').value;
		att.pareceres.reverse();

		this.atendimento = this.service.save(att);
		this.att = this.atendimento;
		this.save.emit(this.atendimento);
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			const _id = this.atendimento._id;
			this.service.delete(_id);
			this.delete.emit(_id);
		}
	}

	onConfirmDelete(): void {
		this.dialogs.modalDelete(confirm => this.onDelete(confirm), 'atendimento');
	}

	updateDynamicValidators(): void {
		this.form.get('nome').updateValueAndValidity();
		this.form.get('horario.dia').updateValueAndValidity();
		this.form.get('horario.hora').updateValueAndValidity();
	}

	validateIfHasInicio(control: FormControl): {[s: string]: boolean} {
		if (this.att.inicio && !this.att.egresso) {
			if (!control.value) {
				return {'required': true};
			}
		}
		return null;
	}
}
