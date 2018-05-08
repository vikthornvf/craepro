import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Aluno } from './aluno.model';
import { Observable } from 'rxjs/Observable';
import { EscolaService } from '../escolas/escola.service';
import { ToastService } from '../shared/toast.service';
import { Responsavel } from './responsavel.model';

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
	headers: Headers;

	private alunos: Aluno[] = [
		new Aluno('1', 'Adão', 'D', 'E3', 'T', this.serviceEscola.findById('1')),
		new Aluno('2', 'Rosângela', 'P', 'E1', 'M', this.serviceEscola.findById('2')),
		new Aluno('3', 'Allan', 'A', 'F9', 'M', this.serviceEscola.findById('3')),
		new Aluno('4', 'Yuri', 'A', 'F8', 'N', this.serviceEscola.findById('6')),
		new Aluno('5', 'Thiagus', 'A', 'F7', 'T', this.serviceEscola.findById('3')),
		new Aluno('6', 'Vikthor', 'A', 'F5', 'T', this.serviceEscola.findById('4')),
		new Aluno('7', 'Isaac', 'E', 'F2', 'M', this.serviceEscola.findById('6')),
		new Aluno('8', 'Ícaro', 'E', 'PB', 'M', this.serviceEscola.findById('2'))
	];
	idCount = 9; // TODO delete

	constructor(private http: Http, private serviceEscola: EscolaService) {
		this.headers = new Headers();
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
		ToastService.toastSuccess(msg);
		return aluno;
	}

	delete(_id: string): boolean {
		this.alunos = this.alunos.filter(e => e._id !== _id);
		ToastService.toastSuccess('Aluno excluído com sucesso!');
		return true;
	}

	removeResponsavel(alunoId: string, responsavel: Responsavel): boolean {
		let success = false;
		this.alunos.find(aluno => {
			if (aluno._id === alunoId) {
				const responsaveis = aluno.responsaveis.filter((r) => r !== responsavel);
				aluno.responsaveis = responsaveis;
				success = true;
				return true;
			}
			return false;
		});
		if (success) {
			ToastService.toastSuccess('Responsável excluído com sucesso!');
			return true;
		}
		else {
			ToastService.toastFail('Ocorreu um erro, tente novamente mais tarde!');
			return false;
		}
	}

	saveResponsavel(alunoId: string, responsavel: Responsavel, index: number) {
		let success = false;
		this.alunos.find(aluno => {
			if (aluno._id === alunoId) {
				const responsaveis = aluno.responsaveis;
				if (responsaveis.length - 1 >= index) {
					responsaveis[index] = responsavel;
				}
				else {
					responsaveis.push(responsavel);
				}
				aluno.responsaveis = responsaveis;
				success = true;
				return true;
			}
			return false;
		});
		if (success) {
			ToastService.toastSuccess('Responsável salvo com sucesso!');
			return true;
		}
		else {
			ToastService.toastFail('Ocorreu um erro, tente novamente mais tarde!');
			return false;
		}
	}
}
