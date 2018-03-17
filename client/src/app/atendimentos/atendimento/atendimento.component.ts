import { Component, OnInit, Input } from '@angular/core';
import { AtendimentoService } from '../atendimento.service';
import { ProfessorService } from '../../professores/professor.service';
import { AlunoService } from '../../alunos/aluno.service';
import { Atendimento } from '../atendimento.model';
import { Professor } from '../../professores/professor.model';
import { Aluno } from '../../alunos/aluno.model';

@Component({
	selector: 'app-atendimento',
	templateUrl: './atendimento.component.html'
})
export class AtendimentoComponent implements OnInit {

	@Input() create = false;
	@Input() showAluno = true;
	@Input() selectedId: string;
	@Input() atendimento: Atendimento;

	professor: Professor;
	aluno: Aluno;

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
		private alunoService: AlunoService) {}

	ngOnInit(): void {
		if (this.create) {
			this.atendimento = null;
			this.loadParent();
		}
		// if (this.create) {
		// 	this.loadProfessores();
		// 	return;
		// }
	}

	loadParent(): void {
		if (this.showAluno) {
			this.aluno = this.alunoService.findById(this.selectedId);
		} else {
			this.professor = this.professorService.findById(this.selectedId);
		}
	}

	loadProfessores() {
		// TODO
		// loadProfessoresByTipoAtendimento
	}

	onSave() {
		// TODO
		console.log('Save ' + this.atendimento._id);
	}

	onDelete() {
		// TODO
		console.log('Delete ' + this.atendimento._id);
	}
}
