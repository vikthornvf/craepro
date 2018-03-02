import { Component, NgZone } from '@angular/core';
import { ListViewComponent } from '../../shared/list-view.component';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario.model';

@Component({
	selector: 'app-usuario-list',
	templateUrl: './usuario-list.component.html',
	styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent extends ListViewComponent {

	link = 'usuario';
	usuarios: Usuario[] = [];

	constructor(
		zone: NgZone,
		navService: NavbarService,
		private service: UsuarioService) { super(zone, navService); }

	loadList(): void {
		this.usuarios = this.service.list();
	}
}
