import { Component, NgZone } from '@angular/core';

import { ListViewComponent } from '../../shared/list-view.component';
import { NavService } from '../../nav/nav.service';
import { UsuarioService } from '../usuario.service';

@Component({
	selector: 'app-usuario-list',
	templateUrl: './usuario-list.component.html',
	styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent extends ListViewComponent {

	link = 'usuario';
	usuarios: any = [];

	constructor(
		z: NgZone,
		ns: NavService,
		private service: UsuarioService) { super(z, ns); }

	loadList(): void {
		this.service.list().subscribe(
			usuarios => {
				this.usuarios = usuarios;
				this.loaded = true;
			},
			err => console.log(err));
	}

	clearSelection(): void {
		this.selectedId = null;
		this.onClose();
	}
}
