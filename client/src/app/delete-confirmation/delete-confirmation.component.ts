import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Component, Input, Output, EventEmitter } from '@angular/core';

// TODO transform into a service like toasts
@Component({
	selector: 'app-delete-confirmation',
	templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmationComponent {

	@Input() text;
	@Output() response: EventEmitter<boolean> = new EventEmitter<false>();
	callback: Function;

	label: string;
	labeled = false;

	modalActions = new EventEmitter<string|MaterializeAction>();
	modalParams = [{ complete: () => this.onModalClose() }];
	res = false;

	open(label?: string, callback?: Function) {
		if (label) {
			this.labeled = true;
			this.label = label;
		}
		if (callback) {
			this.callback = callback;
		}
		this.modalActions.emit({ action: 'modal', params: ['open'] });
	}

	onModalClose() {
		this.labeled = false;
		this.response.emit(this.res);
		if (this.callback && this.callback instanceof Function) {
			this.callback(this.res);
		}
	}
}
