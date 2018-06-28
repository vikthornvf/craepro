import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { EscolaService } from '../escolas/escola.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { Usuario } from './usuario.model';
import { Enums } from '../shared/enums';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

	private readonly url = '/api/usuario';
	private headers: HttpHeaders;

	constructor(
		private http: HttpClient,
		private auth: AuthService,
		private dialogs: DialogsService,
		private router: Router) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Observable<Usuario[]> {
		return this.http.get(this.url)
			.map(res => res as Usuario[]);
	}

	findById(id: string): Observable<Usuario> {
		return this.http.get(`${this.url}/${id}`);
	}

	getUsuarioTipo(tipo: string): string {
		const tipoUsuario = Enums.TipoUsuario.find((t) => t.value === tipo);
		if (tipoUsuario) {
			return tipoUsuario.name;
		}
		return null;
	}

	loadLoggedUsuario(): Usuario {
		return this.auth.getUsuarioDetails();
	}

	confirmUsuario(usuario: Usuario): void {
		if (usuario) {
			usuario.solicitado = false;
			this.save(usuario, `Usuario(a) ${usuario.nome || usuario.email} confirmado!`, false);
		}
	}

	save(usuario: Usuario, successMessage?: string, redirect: boolean = true): Usuario {
		const id = usuario._id;
		if (id) {
			this.http.put(`${this.url}/${id}`, usuario, { headers: this.headers })
				.subscribe(
					res => {
						if (!successMessage) {
							successMessage = `Dados de usuario(a) ${usuario.nome || usuario.email} salvos com sucesso!`;
						}
						this.dialogs.toastSuccess(successMessage);
						return usuario;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		else {
			this.http.post(this.url, usuario, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Usuario ${usuario.nome || usuario.email} criado com sucesso!`);
						usuario._id = res['_id'];
						if (redirect) {
							this.router.navigateByUrl('/usuarios/usuario/' + usuario._id);
						}
						return usuario;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		return usuario;
	}

	onSave(usuario: Usuario): Observable<Usuario> {
		const id = usuario._id;
		if (id) {
			return this.http.put(`${this.url}/${id}`, usuario, { headers: this.headers });
		}
		return this.http.post(this.url, usuario, { headers: this.headers });
	}

	delete(id: string) {
		this.http.delete(`${this.url}/${id}`).subscribe(
			res => this.dialogs.toastSuccess('Usuário excluído com sucesso!'),
			err => {
				console.log(err);
				this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
			});
	}
}
