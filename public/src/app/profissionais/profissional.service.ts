import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DialogsService } from '../dialogs/dialogs.service';
import { Profissional } from './profissional.model';

@Injectable()
export class ProfissionalService {

	readonly url = '/api/profissional';
	headers: HttpHeaders;

	constructor(
		private http: HttpClient,
		private dialogs: DialogsService,
		private router: Router) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Observable<Profissional[]> {
		return this.http.get(this.url)
			.pipe(
				map(res => res as Profissional[])
			);
	}

	listByNomeAndTipoAtendimento(profissionais: Profissional[], nome: string, tipo: string): Profissional[] {
		if (nome) {
			nome = nome.toLowerCase();
			return profissionais.filter(p => (p.nome.toLowerCase().includes(nome) && p.atendimentoTipos.includes(tipo)));
		}
		return profissionais.filter(p => p.atendimentoTipos.includes(tipo));
	}

	findById(id: string): Observable<Profissional> {
		return this.http.get(`${this.url}/${id}`);
	}

	save(profissional: Profissional, redirect: boolean = true): Profissional {
		const id = profissional._id;
		if (id) {
			this.http.put(`${this.url}/${id}`, profissional, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Dados de profissional ${profissional.nome} salvos com sucesso!`);
						return profissional;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		else {
			this.http.post(this.url, profissional, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Profissional ${profissional.nome} salvo com sucesso!`);
						profissional._id = res['_id'];
						if (redirect) {
							this.router.navigateByUrl('/profissionais/profissional/' + profissional._id);
						}
						return profissional;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		return profissional;
	}

	delete(id: string) {
		this.http.delete(`${this.url}/${id}`).subscribe(
			res => this.dialogs.toastSuccess('Profissional excluído com sucesso!'),
			err => {
				console.log(err);
				this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
			});
	}
}
