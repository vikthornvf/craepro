import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EscolaService } from '../escolas/escola.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioService {

	readonly url = 'api/usuarios';
	headers: HttpHeaders;

	idCount = 6; // TODO delete

	private usuarios: Usuario[] = [
		new Usuario('1', 'abel', 'abel@email.com', this.escolaService.findById('1'), []),
		new Usuario('2', 'cris', 'cris@email.com', this.escolaService.findById('1'), [ 'A1', 'A2', 'P1', 'P2']),
		new Usuario('3', 'dudu', 'dudu@email.com', this.escolaService.findById('3'), []),
		new Usuario('4', 'luca', 'luca@email.com', this.escolaService.findById('4'), []),
		new Usuario('5', 'zelda', 'zelda@email.com', this.escolaService.findById('2'), [])
	];

	constructor(
		private escolaService: EscolaService,
		private dialogs: DialogsService) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Usuario[] {
		return this.usuarios.slice();
	}

	findById(id: string): Usuario {
		return this.usuarios.find(usuario => usuario._id === id);
	}

	loadLoggedUsuario(): Usuario {
		const usuarios = this.usuarios.slice();
		return usuarios[1];
	}

	save(usuario: Usuario): Usuario {
		let msg: string;

		if (usuario._id) {
			const attIndex = this.usuarios.find(a => a._id === usuario._id);
			const index = this.usuarios.indexOf(attIndex);
			this.usuarios[index] = usuario;
			msg = `Dados de usuario(a) ${usuario.nome || usuario.email} salvos com sucesso!`;
		} else {
			usuario._id = this.idCount + '';
			this.usuarios.push(usuario);
			this.idCount++;
			msg = `Usuario ${usuario.nome || usuario.email} salvo com sucesso!`;
		}
		this.dialogs.toastSuccess(msg);
		return usuario;
	}

	delete(id: string): boolean {
		this.usuarios = this.usuarios.filter(e => e._id !== id);
		this.dialogs.toastSuccess('Professor excluído com sucesso!');
		return true;
	}

	logout(): void {
		// TODO
		console.log('logout');
	}
}

