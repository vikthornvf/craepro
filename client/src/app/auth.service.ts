import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogsService } from './dialogs/dialogs.service';
import { Usuario } from './usuarios/usuario.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

export interface UsuarioDetails {
	_id: string;
	email: string;
	nome: string;
	permissoes: string[];
	exp: number;
}

interface TokenResponse {
	token: string;
}

export interface TokenPayload {
	email: string;
	senha: string;
	nome?: string;
}

@Injectable()
export class AuthService {

	private token: string;

	constructor(
		private http: HttpClient,
		private dialogs: DialogsService,
		private router: Router) {}

	private saveToken(token: string) {
		localStorage.setItem('craepro-token', token);
		this.token = token;
	}

	private getToken(): string {
		if (!this.token) {
			this.token = localStorage.getItem('craepro-token');
		}
		return this.token;
	}

	public getUsuarioDetails(): UsuarioDetails {
		const token = this.getToken();
		if (token) {
			let payload = token.split('.')[1];
			try {
				payload = window.atob(payload);
			} catch (err) {
				this.saveToken(null);
				return null;
			}
			return JSON.parse(payload);
		}
		return null;
	}

	public isLoggedIn(): boolean {
		const usuario = this.getUsuarioDetails();
		if (usuario) {
			return true;
		}
		return false;
	}

	public login(usuario: TokenPayload): Observable<TokenResponse> {
		return this.http.post('/api/login', usuario).pipe(
			map((data: TokenResponse) => {
				if (data.token) {
					this.saveToken(data.token);
				}
				return data;
			})
		);
	}

	public logout() {
		this.token = '';
		localStorage.removeItem('craepro-token');
		this.router.navigateByUrl('/');
	}
}
