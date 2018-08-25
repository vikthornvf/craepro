import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Atendimento } from '../atendimento.model';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-atendimento-modal',
	templateUrl: './atendimento-modal.component.html'
})
export class AtendimentoModalComponent implements OnInit {

	@Input() selectedId: string;
	@Input() atendimento: Atendimento;
	@Output() load = new EventEmitter<boolean>();
	@Output() close = new EventEmitter<boolean>();
	@ViewChild('atendimentoElement') atendimentoElement;

	canCreate: boolean;
	canEdit: boolean;
	canEditParecer: boolean;

	closed = true;
	create: boolean;
	modalAtendimentoActions = new EventEmitter<string|MaterializeAction>();
	modalAtendimentoParams = [{
		dismissible: false,
		complete: () => {
			this.closed = true;
			this.close.emit(true);
		}
	}];

	constructor(private auth: AuthService) {}

	ngOnInit() {
		const auth = this.auth.getUsuarioDetails().permissoes;
		this.canCreate = auth.includes('A2');
		this.canEditParecer = auth.includes('A3');
		this.canEdit = auth.includes('A4');
	}

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

	onSave() {
		this.atendimentoElement.onSave();
	}

	private onOpen() {
		this.closed = false;
		this.modalAtendimentoActions.emit({ action: 'modal', params: ['open'] });
	}
}
