import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDetails } from '../../auth.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { UsuarioService } from '../../usuarios/usuario.service';
import { Usuario } from '../../usuarios/usuario.model';

@Component({
	selector: 'app-confirmar-usuarios',
	templateUrl: './confirmar-usuarios.component.html'
})
export class ConfirmarUsuariosComponent implements OnInit {

	@Input() usuario: UsuarioDetails;
	loaded: boolean;
	usuarios: Usuario[];

	constructor(
		private usuarioService: UsuarioService,
		private dialogs: DialogsService,
		private router: Router) {}

	ngOnInit() {
		this.usuarioService.listSolicitado()
			.subscribe((usuarios) => {
				this.usuarios = usuarios;
				this.loaded = true;
			});
	}

	onViewUusario(usuario: Usuario) {
		if (usuario) {
			this.router.navigateByUrl('/usuarios/usuario/' + usuario._id);
		}
	}

	onConfirmUusario(usuario: Usuario) {
		if (usuario) {
			this.dialogs.modalConfirmation((confirm) => {
				if (confirm) {
					this.usuarioService.confirmUsuario(usuario);
					this.usuarios = this.usuarios.filter((u) => u._id !== usuario._id);
				}
			}, `Deseja confirmar o acesso para o(a) usuario(a) ${usuario.nome}?`);
		}
	}
}
