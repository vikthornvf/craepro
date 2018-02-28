import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Component, Input, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-atendimento-modal',
	templateUrl: './atendimento-modal.component.html'
})
export class AtendimentoModalComponent {

	@Input() selectedId: string;
	@Input() atendimentoId: string;

	modalAtendimentoActions = new EventEmitter<string|MaterializeAction>();
	modalAtendimentoParams = [{ dismissible: false }];

	open(selectedId: string, atendimentoId: string) {
		this.selectedId = selectedId;
		this.atendimentoId = atendimentoId;
		this.modalAtendimentoActions.emit({ action: 'modal', params: ['open'] });
	}
}
