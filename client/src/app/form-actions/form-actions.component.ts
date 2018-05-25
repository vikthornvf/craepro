import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavbarService } from '../nav/navbar/navbar.service';

@Component({
	selector: 'app-form-actions',
	templateUrl: './form-actions.component.html',
	styleUrls: ['./form-actions.component.css']
})
export class FormActionsComponent {

	@Input() invalid: boolean;
	@Input() canDelete: boolean;
	@Output() save = new EventEmitter<boolean>();
	@Output() delete = new EventEmitter<boolean>();

	constructor(private service: NavbarService) {}

	onSave(): void {
		this.save.emit(true);
	}

	onDelete(): void {
		this.delete.emit(true);
	}

	cancel(): void {
		this.service.onNavigateBack();
	}
}
