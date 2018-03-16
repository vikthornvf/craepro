import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

	routes = [
		{ name: 'alunos', label: 'Alunos' },
		{ name: 'professores', label: 'Professores' },
		{ name: 'escolas', label: 'Escolas' },
		{ name: 'usuarios', label: 'Usuários' }
	];

	onNavigate($event: Event): void {
		$event.preventDefault();
		$('.button-collapse').sideNav('hide');
	}
}
