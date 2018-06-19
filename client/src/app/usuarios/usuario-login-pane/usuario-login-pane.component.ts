import { Component, OnInit } from '@angular/core';

declare var Materialize: any;

@Component({
	selector: 'app-usuario-login-pane',
	templateUrl: './usuario-login-pane.component.html',
	styleUrls: ['./usuario-login-pane.component.css']
})
export class UsuarioLoginPaneComponent implements OnInit {

	login = true;

	ngOnInit() {
		this.updateTextFields();
	}

	toggleLogin() {
		this.login = !this.login;
		this.updateTextFields();
	}

	private updateTextFields() {
		if (typeof Materialize.updateTextFields === 'function') {
			setTimeout(() => Materialize.updateTextFields(), 20);
		}
	}
}
