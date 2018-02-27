import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Atendimento } from '../atendimento.model';
import { Aluno } from '../../alunos/aluno.model';
import { AtendimentoService } from '../atendimento.service';

@Component({
	selector: 'app-atendimento-list',
	templateUrl: './atendimento-list.component.html'
})
export class AtendimentoListComponent implements OnChanges {

	@Input() property: string;
	@Input() selectedId: string;

	atendimentos: Atendimento[] = [];
	selectedAtendimentoId: string;
	isAtendimentosLoaded = false;

	timer;
	preventSimpleClick = false;
	delay = 200;

	constructor(private service: AtendimentoService) {}

	ngOnChanges(): void {
		this.loadAtendimentos();
	}

	loadAtendimentos() {
		this.atendimentos = [];
		this.isAtendimentosLoaded = false;
		// TODO load here
		setTimeout(() => {
			if (this.property !== 'aluno') {
				this.atendimentos = this.service.listByAluno(this.selectedId);
			} else {
				this.atendimentos = this.service.listByProfessor(this.selectedId);
			}
			this.isAtendimentosLoaded = true;
		}, 500);
	}

	onClick() {
		this.preventSimpleClick = false;
		this.timer = setTimeout(() => {
			if (!this.preventSimpleClick) {
				this.onSelect();
			}
		}, this.delay);
	}

	onDoubleClick() {
		this.preventSimpleClick = true;
		clearTimeout(this.timer);
		this.onOpenModal();
	}

	onPress() {
		this.onOpenModal();
	}

	onSelect() {
		// TODO
	}

	onOpenModal() {
		// TODO
	}

	onSaveAtendimento() {
		// TODO
		// if (this.selectedAtendimentoId) save
		// else create;
		console.log('save');
	}
}
