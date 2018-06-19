import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from './usuarios/usuario.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

export interface UsuarioDetails {
	_id: string;
	email: string;
	nome: string;
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
		let payload;
		if (token) {
			payload = token.split('.')[1];
			payload = window.atob(payload);
			return JSON.parse(payload);
		} else {
			return null;
		}
	}

	public isLoggedIn(): boolean {
		// const user = this.getUsuarioDetails();
		const user = this.getToken();
		if (user) {
			return true;
		}
		else {
			return false;
		}
	}

	private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<Usuario> {
		let base;

		if (method === 'post') {
			base = this.http.post(`/api/${type}`, user);
		} else {
			base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
		}

		const request = base.pipe(
			map((data: TokenResponse) => {
				if (data.token) {
					this.saveToken(data.token);
				}
				return data;
			})
		);

		return request;
	}

	public register(user: TokenPayload): Observable<Usuario> {
		return this.request('post', 'register', user);
	}

	public login(user: TokenPayload): Observable<Usuario> {
		return this.request('post', 'login', user);
	}

	public profile(): Observable<Usuario> {
		return this.request('get', 'profile');
	}

	public logout() {
		this.token = '';
		localStorage.removeItem('craepro-token');
		this.router.navigateByUrl('/');
	}
}
