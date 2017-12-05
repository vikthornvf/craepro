import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-floating-edit-button',
	template: `
	<div class="fixed-action-btn horizontal scale-transition" [ngClass]="{ 'hide': hide, 'scale-in': active, 'scale-out': !active }">
		<a class="btn btn-floating btn-large light-blue darken-2 z-depth-2" [routerLink]="link">
			<i class="large material-icons">mode_edit</i>
		</a>
		<ng-content></ng-content>
	</div>`
})
export class FloatingEditButtonComponent implements OnInit {

	@Input() link: string;
	@Input() active: boolean;
	hide = true;

	ngOnInit() {
		setTimeout(() => this.hide = false, 200);
	}
}
