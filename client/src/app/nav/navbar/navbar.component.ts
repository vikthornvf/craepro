import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Location } from '@angular/common';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs/Subscription';
import { UsuarioService } from '../../usuarios/usuario.service';

declare var $: any;

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterContentChecked {

	state: string = this.navService.state.NAVBAR;
	stateObservable: Subscription;

	constructor(
		private navService: NavbarService,
		private usuarioService: UsuarioService) {}

	ngOnInit() {
		this.stateObservable = this.navService.barState.subscribe(barState => this.state = barState);
	}

	ngOnDestroy() {
		this.stateObservable.unsubscribe();
	}

	ngAfterContentChecked() {
		$('.dropdown-button').dropdown();
	}

	onBack() {
		this.navService.onNavigateBack();
	}

	onLogout() {
		this.usuarioService.logout();
	}
}
