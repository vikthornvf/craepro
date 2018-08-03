import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { NavService } from '../nav.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Usuario } from '../../usuarios/usuario.model';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

	state: string = this.navService.state.NAVBAR;
	stateObservable: Subscription;
	show: boolean;
	hideObservable: Subscription;
	usuario: Usuario;

	constructor(
		private navService: NavService,
		private dialogs: DialogsService,
		private auth: AuthService,
		private _zone: NgZone) {}

	ngOnInit() {
		this.show = this.auth.isLoggedIn();
		this.usuario = this.auth.getUsuarioDetails();
		this.hideObservable = this.navService.hideTopbar.subscribe(hide => this.show = !hide);
		this.stateObservable = this.navService.barState.subscribe(barState => this.state = barState);
	}

	ngOnDestroy() {
		this.stateObservable.unsubscribe();
		this.hideObservable.unsubscribe();
	}

	onLogout() {
		this.dialogs.modalConfirmation(confirm => {
			if (confirm) { this._zone.run(() => this.auth.logout()); }
		}, 'Deseja realmente sair da sua conta de usuário?', 'power_settings_new');
	}

	onBack() {
		this.navService.onNavigateBack();
	}
}
