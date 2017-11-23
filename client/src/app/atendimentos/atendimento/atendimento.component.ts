import { Component, Input } from '@angular/core';
import { Atendimento } from '../atendimento.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

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

	ngOnInit(): void {
		this.loadAtendimento();
		if (this.isFromAluno) {
			this.loadProfessor();
			return;
		}
		this.loadAluno();
	}

	loadAtendimento() {
		// TODO
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
