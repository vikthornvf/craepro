import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Atendimento } from '../atendimento.model';
import { Aluno } from '../../alunos/aluno.model';

declare var $: any;

/**
 * AtendimentoItem
 * can be used by alunos or professores
 */
@Component({
	selector: 'app-atendimento-item',
	templateUrl: './atendimento-item.component.html'
})
export class AtendimentoItemComponent {

	@Input() atendimento: Atendimento;
	@Input() selectedId: string;
	@Output() select = new EventEmitter<string>();
	@Output() openModal = new EventEmitter();

	timer;
	preventSimpleClick = false;
	delay = 200;

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
		this.select.emit(this.atendimento._id);
	}

	onOpenModal() {
		this.openModal.emit();
	}
}

