import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-floating-add-button',
	template: `
	<div class="fixed-action-btn horizontal">
		<a class="btn btn-floating btn-large z-depth-2 darken-1" ngClass={{color}} [routerLink]="link">
			<i class="large material-icons">add</i>
		</a>
	</div>`
})
export class FloatingAddButtonComponent {

	@Input() link: string;
	@Input() color: boolean;
}
