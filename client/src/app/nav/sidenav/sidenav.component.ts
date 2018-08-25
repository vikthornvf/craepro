import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavService } from '../nav.service';
import { AuthService } from '../../auth.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { Subscription } from 'rxjs/Subscription';
import { Usuario } from '../../usuarios/usuario.model';

interface SidenavRoute {
	name: string;
	label: string;
	auth: string;
}

declare var $;

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

	private readonly defaultRoutes: SidenavRoute[] = [
		{ name: 'dashboard', label: 'Dashboard', auth: '' },
		{ name: 'alunos', label: 'Alunos', auth: 'A1' },
		{ name: 'profissionais', label: 'Profissionais', auth: 'P1' },
		{ name: 'escolas', label: 'Escolas', auth: 'E1' },
		{ name: 'usuarios', label: 'Usuários', auth: 'U1' }
	];
	routes: SidenavRoute[];
	show: boolean;
	hideSubscription: Subscription;

	constructor(
		private service: NavService,
		private auth: AuthService,
		private router: Router,
		private dialogs: DialogsService,
		private _zone: NgZone) {}

	ngOnInit() {
		this.hideSubscription = this.service.hideSidebar.subscribe((hide) => {
			this.show = !hide;
		});
		this.onBuildRoutes();
	}

	ngOnDestroy() {
		this.hideSubscription.unsubscribe();
	}

	onBuildRoutes() {
		const usuario = this.auth.getUsuarioDetails();
		const routes: SidenavRoute[] = [];
		if (usuario) {
			this.defaultRoutes.forEach(route => {
				if (!route.auth.length || usuario.permissoes.includes(route.auth)) {
					routes.push(route);
				}
			});
		}
		this.routes = routes;
	}

	onNavigate($event: Event): void {
		$event.preventDefault();
		$('.button-collapse').sideNav('hide');
	}

	onLogout() {
		this.dialogs.modalConfirmation(confirm => {
			if (confirm) { this._zone.run(() => this.auth.logout()); }
		}, 'Deseja realmente sair da sua conta de usuário?', 'power_settings_new');
	}
}
