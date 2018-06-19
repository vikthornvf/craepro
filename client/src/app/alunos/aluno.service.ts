import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EscolaService } from '../escolas/escola.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { Aluno } from './aluno.model';
import { Responsavel } from '../responsaveis/responsavel.model';

/**
	ROUTES

	app.get('/api/aluno/escola/:escolaId', controller.list);
	app.get('/api/aluno/escola/:escolaId/desativados/:isDesativados', controller.list);

	app.route('/api/aluno')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/aluno/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
 */
@Injectable()
export class AlunoService {

	readonly url = 'api/aluno';
	headers: HttpHeaders;

	private alunos: Aluno[] = [
		new Aluno('1', 'Alex dos Santos', 'D', 'E3', 'T', this.serviceEscola.findById('1')),
		new Aluno('2', 'Ana Clara', 'P', 'E1', 'M', this.serviceEscola.findById('2')),
		new Aluno('3', 'Betinho', 'A', 'F9', 'M', this.serviceEscola.findById('3')),
		new Aluno('4', 'Carol Maria', 'A', 'F8', 'N', this.serviceEscola.findById('6')),
		new Aluno('5', 'Carlinhos', 'A', 'F7', 'T', this.serviceEscola.findById('3')),
		new Aluno('6', 'Joãozinho da Silva', 'A', 'F5', 'T', this.serviceEscola.findById('4')),
		new Aluno('7', 'Karolzinha', 'E', 'F2', 'M', this.serviceEscola.findById('6')),
		new Aluno('8', 'Zezinho', 'E', 'PB', 'M', this.serviceEscola.findById('2'))
	];
	idCount = 9; // TODO delete

	constructor(
		private http: HttpClient,
		private serviceEscola: EscolaService,
		private dialogs: DialogsService) {
		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Aluno[] {
		// this.service.list()
		// 	.subscribe(
		// 		alunos => this.alunos = alunos,
		// 		err => console.log(err));
		return this.alunos.slice();
	}

	findById(_id: string): Aluno {
		return this.alunos.find(a => a._id === _id);
	}

	save(aluno: Aluno): Aluno {
		let msg: string;

		if (aluno._id) {
			const attIndex = this.alunos.find(a => a._id === aluno._id);
			const index = this.alunos.indexOf(attIndex);
			this.alunos[index] = aluno;
			msg = `Dados de aluno(a) ${aluno.nome} salvos com sucesso!`;
		} else {
			aluno._id = this.idCount + '';
			this.alunos.push(aluno);
			this.idCount++;
			msg = `Aluno(a) ${aluno.nome} salvo com sucesso!`;
		}
		this.dialogs.toastSuccess(msg);
		return aluno;
	}

	updateSituacao(aluno: Aluno): Aluno {
		if (aluno._id) {
			const attIndex = this.alunos.find(a => a._id === aluno._id);
			const index = this.alunos.indexOf(attIndex);
			this.alunos[index] = aluno;
		}
		return aluno;
	}

	delete(id: string): boolean {
		this.alunos = this.alunos.filter(e => e._id !== id);
		this.dialogs.toastSuccess('Aluno excluído com sucesso!');
		return true;
	}
}
