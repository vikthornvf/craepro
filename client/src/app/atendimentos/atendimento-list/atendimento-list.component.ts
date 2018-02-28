import { Component, Input, OnChanges } from '@angular/core';
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
	atendimentoId: string;
	isAtendimentosLoaded = false;

	timer;
	preventSimpleClick = false;
	delay = 200;

	constructor(private service: AtendimentoService) {}

	ngOnChanges(): void {
		this.loadAtendimentos();
	}

	onLoad(): void {
		this.atendimentos = [];
		this.isAtendimentosLoaded = false;
	}

	loaded(): void {
		this.isAtendimentosLoaded = true;
	}

	loadAtendimentos(): void {
		this.onLoad();
		setTimeout(() => {
			if (this.property === 'profissional') {
				this.atendimentos = this.service.listByAluno(this.selectedId);
			} else
			if (this.property === 'aluno') {
				this.atendimentos = this.service.listByProfessor(this.selectedId);
			}
			this.loaded();
		}, 500);
	}

	onClick(id: string): void {
		this.preventSimpleClick = false;
		this.timer = setTimeout(() => {
			if (!this.preventSimpleClick) {
				this.onSelect(id);
			}
		}, this.delay);
	}

	onDoubleClick(id: string): void {
		this.preventSimpleClick = true;
		clearTimeout(this.timer);
		if (this.atendimentoId !== id) {
			this.onSelect(id);
		}
	}

	onSelect(id: string): void {
		this.atendimentoId = this.atendimentoId === id
			? null
			: id;
	}

	onSaveAtendimento(): void {
		// TODO
		// if (this.atendimentoId) save
		// else create;
		console.log('save');
	}
}
