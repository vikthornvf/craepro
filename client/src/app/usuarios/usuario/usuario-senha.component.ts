import { Component } from '@angular/core';
import { Usuario } from '../usuario.model';

@Component({
	selector: 'app-usuario-senha',
	templateUrl: './usuario-senha.component.html'
})
export class UsuarioSenhaComponent {

	usuario: Usuario = new Usuario('1', 'cris', 'CRAE', 'cris@email.com');
}
