import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Escola } from './escola.model';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable()
export class EscolaService {

	readonly url = '/api/escola';
	headers: HttpHeaders;

	constructor(
		private http: HttpClient,
		private dialogs: DialogsService,
		private router: Router) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Observable<Escola[]> {
		return this.http.get(this.url)
			.pipe(
				map(res => res as Escola[])
			);
	}

	findById(id: string): Observable<Escola> {
		return this.http.get(`${this.url}/${id}`);
	}

	save(escola: Escola, redirect: boolean = true): Escola {
		const id = escola._id;
		if (id) {
			this.http.put(`${this.url}/${id}`, escola, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Dados de escola ${escola.nome} salvos com sucesso!`);
						return escola;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		else {
			this.http.post(this.url, escola, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Escola ${escola.nome} salvo com sucesso!`);
						escola._id = res['_id'];
						if (redirect) {
							this.router.navigateByUrl('/escolas/escola/' + escola._id);
						}
						return escola;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		return escola;
	}

	delete(id: string) {
		this.http.delete(`${this.url}/${id}`).subscribe(
			res => this.dialogs.toastSuccess('Escola excluída com sucesso!'),
			err => {
				console.log(err);
				this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
			});
	}
}

