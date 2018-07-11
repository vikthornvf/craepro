import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlunoService } from '../alunos/aluno.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { Atendimento } from './atendimento.model';
import { Parecer } from './parecer.model';
import { Horario } from './horario.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AtendimentoService {

	readonly url = '/api/atendimento';
	headers: HttpHeaders;

	constructor(
		private http: HttpClient,
		private alunoService: AlunoService,
		private dialogs: DialogsService) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Observable<Atendimento[]> {
		return this.http.get(this.url)
			.map(res => res as Atendimento[]);
	}

	listByAluno(alunoId: string): Observable<Atendimento[]> {
		return this.http.get(`${this.url}/aluno/${alunoId}`)
			.map(res => res as Atendimento[]);
	}

	listByProfissional(profissionalId: string): Observable<Atendimento[]> {
		return this.http.get(`${this.url}/profissional/${profissionalId}`)
			.map(res => res as Atendimento[]);
	}

	findById(id: string): Observable<Atendimento> {
		return this.http.get(`${this.url}/${id}`);
	}

	save(atendimento: Atendimento): Atendimento {
		const id = atendimento._id;
		if (id) {
			this.http.put(`${this.url}/${id}`, atendimento, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess(`Dados do atendimento alterados com sucesso!`);
						this.updateAlunoSituacao(atendimento);
						return atendimento;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		else {
			this.http.post(this.url, atendimento, { headers: this.headers })
				.subscribe(
					res => {
						this.dialogs.toastSuccess('Atendimento criado com sucesso!');
						atendimento._id = res['_id'];
						this.updateAlunoSituacao(atendimento);
						return atendimento;
					},
					err => {
						console.log(err);
						this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
				});
		}
		return atendimento;
	}

	onCreate(atendimento: Atendimento): Observable<Atendimento> {
		const id = atendimento._id;
		if (!id) {
			return this.http.post(this.url, atendimento, { headers: this.headers });
		}
	}

	updateAlunoSituacao(atendimento: Atendimento) {
		if (!atendimento) {
			return;
		}
		const aluno = atendimento.aluno;
		if (!aluno) {
			return;
		}
		this.listByAluno(aluno._id).subscribe(
			atendimentos => this.alunoService.updateSituacao(aluno, atendimentos),
			err => console.log(err));
	}

	delete(id: string) {
		this.http.delete(`${this.url}/${id}`).subscribe(
			res => this.dialogs.toastSuccess('Atendimento excluído com sucesso!'),
			err => {
				console.log(err);
				this.dialogs.toastFail('Ocorreu um erro! Por favor, tente mais tarde.');
		});
	}
}
