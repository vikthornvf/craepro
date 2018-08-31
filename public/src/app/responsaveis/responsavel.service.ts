import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DialogsService } from '../dialogs/dialogs.service';
import { Responsavel } from './responsavel.model';

@Injectable()
export class ResponsavelService {

	readonly url = '/api/responsavel';
	headers: HttpHeaders;

	constructor(
		private http: HttpClient,
		private dialogs: DialogsService) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Observable<Responsavel[]> {
		return this.http.get(this.url)
			.pipe(
				map(res => res as Responsavel[])
			);
	}

	listByAluno(alunoId: string): Observable<Responsavel[]> {
		return this.http.get(`${this.url}/aluno/${alunoId}`)
			.pipe(
				map(res => res as Responsavel[])
			);
	}

	findById(id: string): Observable<Responsavel> {
		return this.http.get(`${this.url}/${id}`);
	}

	save(responsavel: Responsavel): Responsavel {
		const id = responsavel._id;
		if (id) {
			this.http.put(`${this.url}/${id}`, responsavel, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Dados do responsavel ${responsavel.nome} alterados com sucesso!`);
						return responsavel;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		else {
			this.http.post(this.url, responsavel, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Responsavel ${responsavel.nome} criado com sucesso!`);
						responsavel._id = res['_id'];
						return responsavel;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		return responsavel;
	}

	onCreate(responsavel: Responsavel): Observable<Responsavel> {
		const id = responsavel._id;
		if (!id) {
			return this.http.post(this.url, responsavel, { headers: this.headers });
		}
	}

	delete(id: string) {
		this.http.delete(`${this.url}/${id}`).subscribe(
			res => this.dialogs.toastSuccess('Responsavel excluído com sucesso!'),
			err => {
				console.log(err);
				this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
			});
	}
}
