import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../usuario.model';
import { NavbarService } from '../../nav/navbar/navbar.service';

@Component({
	selector: 'app-usuario-list',
	templateUrl: './usuario-list.component.html',
	styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit, OnDestroy {

	keyword = '';
	selectedUsuarioId = '';
	usuarios: Usuario[] = [];

	constructor(private navProps: NavbarService) { }

	ngOnInit(): void {
		this.navProps.keyword.subscribe(keyword => this.keyword = keyword);
		this.navProps.changeNavbarSearch(true);
		this.loadUsuarios();
	}

	ngOnDestroy(): void {
		this.navProps.changeNavbarSearch(false);
	}

	onChangeKeyword(keyword: string) {
		this.keyword = keyword;
	}

	loadUsuarios() {
		this.usuarios = [
			new Usuario('1', 'abel', 'Escolinha', 'abel@email.com'),
			new Usuario('2', 'cris', 'CRAE', 'cris@email.com'),
			new Usuario('3', 'dudu', 'Colégio', 'dudu@email.com'),
			new Usuario('4', 'luca', 'Óia o Estudo', 'luca@email.com'),
			new Usuario('5', 'zelda', 'Vamstudá', 'zelda@email.com'),
		];
	}

	onSelectUsuario(usuarioId: string) {
		this.selectedUsuarioId = this.selectedUsuarioId !== usuarioId
			? usuarioId
			: null;
	}
}
