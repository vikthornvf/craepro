import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavService } from '../../nav/nav.service';

declare var Materialize: any;

@Component({
	selector: 'app-usuario-login-pane',
	templateUrl: './usuario-login-pane.component.html',
	styleUrls: ['./usuario-login-pane.component.css']
})
export class UsuarioLoginPaneComponent implements OnInit, OnDestroy {

	login = true;

	constructor(private navService: NavService) {}

	ngOnInit() {
		this.navService.onHideSidebar(true);
		this.navService.onHideTopbar(true);
		this.updateTextFields();
	}

	ngOnDestroy() {
		this.navService.onHideSidebar(false);
		this.navService.onHideTopbar(false);
	}

	toggleLogin() {
		this.login = !this.login;
		this.updateTextFields();
	}

	onNavigateBack() {
		this.navService.onNavigateBack();
	}

	private updateTextFields() {
		if (typeof Materialize.updateTextFields === 'function') {
			setTimeout(() => Materialize.updateTextFields(), 20);
		}
	}
}
