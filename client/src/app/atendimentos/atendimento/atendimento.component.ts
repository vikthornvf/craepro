import { Component, Input } from '@angular/core';
import { Atendimento } from '../atendimento.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AtendimentoService } from '../atendimento.service';
import { AlunoService } from '../../alunos/aluno.service';
import { ProfessorService } from '../../professores/professor.service';

@Component({
	selector: 'app-atendimento',
	templateUrl: './atendimento.component.html'
})
export class AtendimentoComponent implements OnInit {

	@Input() atendimentoId: string;
	@Input() selectedId: string;
	@Input() isFromAluno = true;
	atendimento: Atendimento;
	professores: string[];

	constructor(
		private service: AtendimentoService,
		private professorService: ProfessorService,
		private alunoService: AlunoService) {}

	ngOnInit(): void {
		this.loadAtendimento();
		if (this.isFromAluno) {
			this.loadProfessor();
			return;
		}
		this.loadAluno();
	}

	loadAtendimento() {
		this.atendimento = this.service.findById(this.atendimentoId);
	}

	loadAluno() {
		// TODO
	}

	loadProfessor() {
		// TODO
	}

	loadProfessores() {
		// TODO
		// loadProfessoresByTipoAtendimento
	}

	onSave() {
		// TODO
	}
}
