import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioService {

	readonly url = 'api/usuarios';
	headers: Headers;

	constructor() {
		this.headers = new Headers();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Usuario[] {
		return [
			new Usuario('1', 'abel', 'Escolinha', 'abel@email.com'),
			new Usuario('2', 'cris', 'CRAE', 'cris@email.com'),
			new Usuario('3', 'dudu', 'Colégio', 'dudu@email.com'),
			new Usuario('4', 'luca', 'Óia o Estudo', 'luca@email.com'),
			new Usuario('5', 'zelda', 'Vamstudá', 'zelda@email.com'),
		];
	}

	findById(_id: string): Usuario {
		return this.list().find(
			usuario => usuario._id === _id);
	}
}

