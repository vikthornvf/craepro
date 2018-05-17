import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlunoService } from '../alunos/aluno.service';
import { ProfessorService } from '../professores/professor.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { Responsavel } from './responsavel.model';

/**
	ROUTES
	app.get('/api/Responsavel/aluno/:alunoId', controller.list);
	app.get('/api/Responsavel/professor/:professorId', controller.list);

	app.route('/api/Responsavel')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/Responsavel/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
 */
@Injectable()
export class ResponsavelService {

	readonly url = 'api/responsavel';
	headers: HttpHeaders;

	private responsaveis: Responsavel[] = [];
	idCount = 1; // TODO delete

	constructor(
		private http: HttpClient,
		private serviceAluno: AlunoService,
		private serviceProfessor: ProfessorService,
		private dialogs: DialogsService) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Responsavel[] {
		return this.responsaveis.slice();
	}

	listByAluno(alunoId: string): Responsavel[] {
		return this.responsaveis.filter(a => a.aluno
			? (a.aluno._id === alunoId)
			: false);
	}

	findById(_id: string): Responsavel {
		return this.responsaveis.find(a => a._id === _id);
	}

	save(responsavel: Responsavel): Responsavel {
		let msg: string;

		if (responsavel._id) {
			const attIndex = this.responsaveis.find(a => a._id === responsavel._id);
			const index = this.responsaveis.indexOf(attIndex);
			this.responsaveis[index] = responsavel;
			msg = 'Dados do Responsavel alterados com sucesso!';
		}
		else {
			responsavel._id = this.idCount + '';
			this.responsaveis.unshift(responsavel);
			this.idCount++;
			msg = 'Responsavel criado com sucesso!';
		}
		return responsavel;
	}

	delete(_id: string): boolean {
		this.responsaveis = this.responsaveis.filter(a => a._id !== _id);
		this.dialogs.toastSuccess('Responsavel excluído com sucesso!');
		return true;
	}

	toDate(str: any): Date {
		if (str) {
			if (typeof str === 'string') {
				const from = str.split('/');
				return new Date(+from[2], (+from[1] - 1), +from[0]);
			}
		}
		return str;
	}
}
