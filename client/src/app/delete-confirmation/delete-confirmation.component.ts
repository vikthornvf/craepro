import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-delete-confirmation',
	templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmationComponent {

	@Input() text;
}
