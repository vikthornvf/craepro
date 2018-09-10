import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';

import { AtendimentoComponent } from '../atendimento/atendimento.component';
import { AuthService } from '../../auth.service';
import { Atendimento } from '../atendimento.model';

@Component({
	selector: 'app-atendimento-modal',
	templateUrl: './atendimento-modal.component.html'
})
export class AtendimentoModalComponent {

	@Input() selectedId: string;
	@Input() atendimento: Atendimento;
	@Output() load = new EventEmitter<boolean>();
	@Output() close = new EventEmitter<Atendimento>();
	@ViewChild('atendimentoElement') atendimentoElement: AtendimentoComponent;

	canCreate: boolean;
	canEdit: boolean;
	canEditParecer: boolean;

	opened: boolean;
	create: boolean;
	private modalAtendimentoActions = new EventEmitter<string|MaterializeAction>();
	private modalAtendimentoParams = [{
		dismissible: false,
		complete: () => {
			this.close.emit(this.atendimento);
			this.opened = false;
		}
	}];

	constructor(private auth: AuthService) {}

	onInit() {
		this.opened = true;
		const auth = this.auth.getUsuarioDetails().permissoes;
		this.canCreate = auth.includes('A2');
		this.canEditParecer = auth.includes('A3');
		this.canEdit = auth.includes('A4');
	}

	open(atendimento: Atendimento) {
		this.onOpen();
		this.atendimento = atendimento;
		this.create = !atendimento;
	}

	// openCreate(atendimento: Atendimento) {
	// 	this.onOpen();
	// 	if (this.atendimento === null) {
	// 		this.atendimentoElement.onInit();
	// 	} else {
	// 		this.atendimento = null;
	// 	}
	// 	this.create = true;
	// }

	onSave(atendimento: Atendimento) {
		this.atendimento = atendimento;
		this.onClose();
	}

	private onOpen() {
		this.onInit();
		this.modalAtendimentoActions.emit({ action: 'modal', params: ['open'] });
	}

	private onClose() {
		this.modalAtendimentoActions.emit({ action: 'modal', params: ['close'] });
	}
}
