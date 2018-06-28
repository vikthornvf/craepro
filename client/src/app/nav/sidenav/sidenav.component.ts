import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../auth.service';

declare var $;

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

	private readonly defaultRoutes = [
		{ name: 'alunos', label: 'Alunos', auth: 'A1' },
		{ name: 'professores', label: 'Professores', auth: 'P1' },
		{ name: 'escolas', label: 'Escolas', auth: 'E1' },
		{ name: 'usuarios', label: 'Usuários', auth: 'U1' }
	];

	private routes = [{}];

	constructor(private auth: AuthService, private router: Router) {}

	ngOnInit() {
		this.buildSidenavLinks(this.router.url);
		this.router.events.subscribe(e => {
			if (e instanceof NavigationEnd) {
				this.buildSidenavLinks(e.url);
			}
		});
	}

	buildSidenavLinks(url: string) {
		this.routes = [];
		if (this.auth.isLoggedIn()) {
			const usuario = this.auth.getUsuarioDetails();
			this.defaultRoutes.forEach(route => {
				if (usuario.permissoes.includes(route.auth)) {
					this.routes.push(route);
				}
			});
		}
	}

	onNavigate($event: Event): void {
		$event.preventDefault();
		$('.button-collapse').sideNav('hide');
	}
}
