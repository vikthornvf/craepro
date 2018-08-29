import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DialogsService } from '../dialogs/dialogs.service';
import { Aluno } from './aluno.model';
import { Atendimento } from '../atendimentos/atendimento.model';

@Injectable()
export class AlunoService {

	readonly url = '/api/aluno';
	headers: HttpHeaders;

	constructor(
		private http: HttpClient,
		private dialogs: DialogsService,
		private router: Router) {
		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Observable<Aluno[]> {
		return this.http.get(this.url)
			.pipe(
				map(res => res as Aluno[])
			);
	}

	findById(id: string): Observable<Aluno> {
		return this.http.get(`${this.url}/${id}`);
	}

	save(aluno: Aluno, redirect: boolean = true): Aluno {
		const id = aluno._id;
		if (id) {
			this.http.put(`${this.url}/${id}`, aluno, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Dados de aluno(a) ${aluno.nome} salvos com sucesso!`);
						return aluno;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		else {
			this.http.post(this.url, aluno, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Aluno(a) ${aluno.nome} salvo com sucesso!`);
						aluno._id = res['_id'];
						if (redirect) {
							this.router.navigateByUrl('/alunos/aluno/' + aluno._id);
						}
						return aluno;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		return aluno;
	}

	onSave(aluno: Aluno): Observable<Aluno> {
		const id = aluno._id;
		if (id) {
			return this.http.put(`${this.url}/${id}`, aluno, { headers: this.headers });
		}
		return this.http.post(this.url, aluno, { headers: this.headers });
	}

	updateSituacao(aluno: Aluno, atendimentos: Atendimento[], save: boolean = true): Observable<Aluno> | null {
		let solicitado = false;
		let ativo = false;
		let finalizado = false;
		let situacao = aluno.situacao;

		if (atendimentos && atendimentos.length) {
			atendimentos.forEach(a => {
				if (a.egresso) {
					finalizado = true;
				} else if (a.inicio) {
					ativo = true;
				} else {
					solicitado = true;
				}
			});
		} else {
			finalizado = true;
		}

		if (solicitado || ativo || finalizado) {
			if (solicitado) {
				situacao = ativo
					? 'P'
					: 'E';
			} else if (ativo) {
				situacao = 'A';
			} else if (finalizado) {
				situacao = 'D';
			}
			if (aluno.situacao !== situacao) {
				aluno.situacao = situacao;
				const id = aluno._id;
				if (id && save) {
					return this.http.put(`${this.url}/situacao/${id}`, aluno, { headers: this.headers });
				}
			}
		}
	}

	delete(id: string) {
		this.http.delete(`${this.url}/${id}`).subscribe(
			res => this.dialogs.toastSuccess('Aluno(a) excluído com sucesso!'),
			err => {
				console.log(err);
				this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
			});
	}
}
