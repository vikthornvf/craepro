import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Atendimento } from '../atendimento.model';

@Component({
	selector: 'app-atendimento-modal',
	templateUrl: './atendimento-modal.component.html'
})
export class AtendimentoModalComponent {

	@Input() selectedId: string;
	@Input() atendimento: Atendimento;
	@Output() load = new EventEmitter<boolean>();
	@ViewChild('atendimentoElement') atendimentoElement;

	closed = true;
	create: boolean;
	modalAtendimentoActions = new EventEmitter<string|MaterializeAction>();
	modalAtendimentoParams = [{
		dismissible: false,
		complete: () => this.closed = true
	}];

	emitLoad() {
		this.load.emit(true);
		this.modalAtendimentoActions.emit({ action: 'modal', params: ['close'] });
	}

	open() {
		this.create = false;
		this.onOpen();
	}

	openCreate() {
		this.create = true;
		this.onOpen();
	}

	private onOpen() {
		this.closed = false;
		this.modalAtendimentoActions.emit({ action: 'modal', params: ['open'] });
	}
}
