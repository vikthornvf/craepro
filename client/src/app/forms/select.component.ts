import * as Materialize from 'angular2-materialize';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';

@Component({
	selector: 'app-select',
	template: `
		<select
			materialize="material_select"
			[id]="id"
			[materializeSelectOptions]="options"
			(change)="onChange($event)"
			[value]="initialValue">
			<option value="" disabled selected>Clique para Selecionar</option>
			<option *ngFor="let option of options" [value]="option._id">{{ option.nome }}</option>
		</select>
		<label><ng-content></ng-content></label>`
})
export class SelectComponent {

	@Input() id: string;
	@Input() initialValue;
	@Input() options: Array<{}>;
	@Output() change = new EventEmitter();

	onChange($event: CustomEvent) {
		const value = $event.srcElement['value'];
		this.change.emit(value);
	}
}
