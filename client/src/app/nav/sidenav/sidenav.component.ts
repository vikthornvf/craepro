import { Component, OnInit } from '@angular/core';

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
}
