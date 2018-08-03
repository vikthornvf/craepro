import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavService } from '../nav/nav.service';

@Component({
	selector: 'app-form-actions',
	templateUrl: './form-actions.component.html',
	styleUrls: ['./form-actions.component.css']
})
export class FormActionsComponent {

	@Input() invalid: boolean;
	@Input() canEdit = true;
	@Input() canDelete: boolean;
	@Output() delete = new EventEmitter<boolean>();

	constructor(private service: NavService) {}

	onDelete(): void {
		this.delete.emit(true);
	}

	onCancel(): void {
		this.service.onNavigateBack();
	}
}
