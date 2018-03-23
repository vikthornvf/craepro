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
	@Input() showAluno = true;
	@Input() selectedId: string;
	@Input() atendimento: Atendimento;
	@Output() save = new EventEmitter<Atendimento>();
	@Output() delete = new EventEmitter<string>();

	professor: Professor;
	aluno: Aluno;
	pareceres: FormArray = this.fb.array([]);

	form: FormGroup;
	tipos: {}[] = Enums.Atts;

	datepickerParams = [{
		monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		format: 'dd/mm/yyyy',
		today: 'Hoje',
		clear: 'Limpar',
		close: 'Ok',
	}];

	constructor(
		private service: AtendimentoService,
		private professorService: ProfessorService,
		private alunoService: AlunoService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		if (this.create) {
			this.atendimento = null;
			this.loadParent();
		}
		this.initForm();
		// if (this.create) {
		// 	this.loadProfessores();
		// 	return;
		// }
	}

	initForm(): void {
		this.form = this.fb.group({
			tipo: this.fb.control(null, Validators.required),
			solicitacao: this.fb.control(null, Validators.required),
			inicio: '',
			egresso: '',
			pareceres: this.pareceres
		});

		const a = this.atendimento;
		if (a) {
			this.form.patchValue({
				tipo: a.tipo,
				solicitacao: a.solicitacao,
				inicio: a.inicio,
				egresso: a.egresso,
			});
			this.pareceres = this.form.get('pareceres') as FormArray;
			a.pareceres.forEach(parecer => this.pareceres.insert(0, this.createParecer(parecer)));
		}
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
	}

	removeParecer(i: number): void {
		this.pareceres.removeAt(i);
	}

	loadParent(): void {
		if (this.showAluno) {
			this.aluno = this.alunoService.findById(this.selectedId);
		} else {
			this.professor = this.professorService.findById(this.selectedId);
		}
	}

	loadProfessores(): void {
		// TODO
		// loadProfessoresByTipoAtendimento
	}

	onSave(): void {
		let att = this.atendimento;
		if (!att) {
			att = new Atendimento();
			if (this.showAluno) {
				att.aluno = this.alunoService.findById(this.selectedId);
			} else {
				att.profissional = this.professorService.findById(this.selectedId);
			}
		}

		att.tipo = this.form.get('tipo').value;
		att.solicitacao = this.service.toDate(this.form.get('solicitacao').value);
		att.inicio = this.service.toDate(this.form.get('inicio').value);
		att.egresso = this.service.toDate(this.form.get('egresso').value);
		att.pareceres = this.form.get('pareceres').value;

		this.atendimento = this.service.save(att);
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
