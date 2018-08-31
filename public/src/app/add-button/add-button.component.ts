import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-floating-add-button',
	templateUrl: './add-button.component.html'
})
export class AddButtonComponent {

	@Input() link: string;
	@Input() color: boolean;
}
