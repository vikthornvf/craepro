import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Professor } from './professor.model';
import { DialogsService } from '../dialogs/dialogs.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfessorService {

	readonly url = '/api/professor';
	headers: HttpHeaders;

	constructor(
		private http: HttpClient,
		private dialogs: DialogsService,
		private router: Router) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Observable<Professor[]> {
		return this.http.get(this.url)
			.map(res => res as Professor[]);
	}

	listByNomeAndTipoAtendimento(professores: Professor[], nome: string, tipo: string): Professor[] {
		if (nome) {
			nome = nome.toLowerCase();
			return professores.filter(p => (p.nome.toLowerCase().includes(nome) && p.atendimentoTipos.includes(tipo)));
		}
		return professores.filter(p => p.atendimentoTipos.includes(tipo));
	}

	findById(id: string): Observable<Professor> {
		return this.http.get(`${this.url}/${id}`);
	}

	save(professor: Professor, redirect: boolean = true): Professor {
		const id = professor._id;
		if (id) {
			this.http.put(`${this.url}/${id}`, professor, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Dados de professor(a) ${professor.nome} salvos com sucesso!`);
						return professor;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		else {
			this.http.post(this.url, professor, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Professor(a) ${professor.nome} salvo com sucesso!`);
						professor._id = res['_id'];
						if (redirect) {
							console.log('redirect');
							this.router.navigateByUrl('/professores/professor/' + professor._id);
						}
						return professor;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		return professor;
	}

	delete(id: string) {
		this.http.delete(`${this.url}/${id}`).subscribe(
			res => this.dialogs.toastSuccess('Professor(a) excluído com sucesso!'),
			err => {
				console.log(err);
				this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
			});
	}
}
