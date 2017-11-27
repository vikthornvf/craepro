import * as Materialize from 'angular2-materialize';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';

@Component({
	selector: 'app-input',
	template: `
		<div class="input-field col s6">
			<input
				type="text"
				[value]="model"
				(change)="onChange($event)"
				id="last_name">
			<label for="last_name"><ng-content></ng-content></label>
		</div>`
})
export class InputComponent {

	@Input() model: string;
	@Output() change = new EventEmitter();

	onChange($event: CustomEvent) {
		const value = $event.srcElement['value'];
		this.change.emit(value);
	}
}
