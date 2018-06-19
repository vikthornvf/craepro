import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { EscolaService } from '../escolas/escola.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { Usuario } from './usuario.model';
import { Enums } from '../shared/enums';

@Injectable()
export class UsuarioService {

	private readonly url = 'api/usuarios';
	private headers: HttpHeaders;

	idCount = 6; // TODO delete

	private usuarios: Usuario[] = [
		new Usuario('1', 'Vikthor Ferreira', 'vikthorferreira@gmail.com', this.escolaService.findById('1'), 'A', [], false, 'senha'),
		new Usuario('2', 'abel', 'abel@email.com', this.escolaService.findById('1'), 'A', [], true, 'senha'),
		new Usuario('3', 'cris', 'cris@email.com', this.escolaService.findById('1'), 'P', [], false, 'senha'),
		new Usuario('4', 'dudu', 'dudu@email.com', this.escolaService.findById('3'), 'E', [], false, 'senha'),
		new Usuario('5', 'luca', 'luca@email.com', this.escolaService.findById('4'), 'P', [], false, 'senha'),
		new Usuario('6', 'zelda', 'zelda@email.com', this.escolaService.findById('2'), 'E', [], false, 'senha')
	];

	constructor(
		private router: Router,
		private auth: AuthService,
		private storage: StorageService,
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

	getUsuarioTipo(tipo: string): string {
		const tipoUsuario = Enums.TipoUsuario.find((t) => t.value === tipo);
		if (tipoUsuario) {
			return tipoUsuario.name;
		}
		return null;
	}

	loadLoggedUsuario(): Usuario {
		const usuarios = this.usuarios.slice();
		return usuarios[0];
	}

	confirmUsuario(usuario: Usuario): void {
		usuario.solicitado = false;
		this.dialogs.toastSuccess('Usuário confirmado com sucesso!');
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

	login(usuario?: Usuario): void {
		if (usuario) {
			this.storage.setItem(usuario);
		} else {
			this.storage.setItem(this.loadLoggedUsuario());
		}
		this.router.navigateByUrl('/');
	}

	logout(): void {
		console.log('logout');
		this.storage.removeItem();
		this.router.navigateByUrl('/login');
	}
}
