import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Aluno } from './aluno.model';
import { Observable } from 'rxjs/Observable';
import { EscolaService } from '../escolas/escola.service';

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

	delete(_id: string): boolean {
		this.alunos = this.alunos.filter(e => e._id !== _id);
		console.log('Delete aluno id:' + _id);
		return true;
	}
}
