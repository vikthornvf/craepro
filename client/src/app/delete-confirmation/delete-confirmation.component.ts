import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-delete-confirmation',
	templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmationComponent {

	@Input() text;
	@Output() response: EventEmitter<boolean> = new EventEmitter<false>();

	label: string;
	labeled = false;

	modalActions = new EventEmitter<string|MaterializeAction>();
	modalParams = [{ complete: () => this.onModalClose() }];
	res = false;

	open() {
		this.labeled = false;
		this.modalActions.emit({ action: 'modal', params: ['open'] });
	}

	openWithLabel(label: string) {
		this.labeled = true;
		this.label = label;
		this.modalActions.emit({ action: 'modal', params: ['open'] });
	}

	onModalClose() {
		this.response.emit(this.res);
	}
}
