import { Component } from '@angular/core';
import { Usuario } from '../usuario.model';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html'
})
export class UsuarioComponent {
	usuario: Usuario = new Usuario('1', 'cris', 'CRAE', 'cris@email.com');
}
