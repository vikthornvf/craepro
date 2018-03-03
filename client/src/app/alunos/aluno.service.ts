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
	http: Http;

	constructor(http: Http, private serviceEscola: EscolaService) {

		this.http = http;
		this.headers = new Headers();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Aluno[] {
		// this.service.list()
		// 	.subscribe(
		// 		alunos => this.alunos = alunos,
		// 		err => console.log(err));
		return [
			new Aluno('1', 'Adão', 'D', '9', 'Tarde', this.serviceEscola.findById('1')),
			new Aluno('2', 'Rosângela', 'P', '9', 'Manha', this.serviceEscola.findById('2')),
			new Aluno('3', 'Allan', 'A', '6', 'Manha', this.serviceEscola.findById('3')),
			new Aluno('4', 'Yuri', 'A', '5', 'Noite', this.serviceEscola.findById('6')),
			new Aluno('5', 'Thiagus', 'A', '4', 'Tarde', this.serviceEscola.findById('3')),
			new Aluno('6', 'Vikthor', 'A', '2', 'Tarde', this.serviceEscola.findById('4')),
			new Aluno('7', 'Deisi', 'A', '2', 'Tarde', this.serviceEscola.findById('5')),
			new Aluno('8', 'Isaac', 'E', '1', 'Manha', this.serviceEscola.findById('6')),
			new Aluno('9', 'Ícaro', 'E', '1', 'Manha', this.serviceEscola.findById('2'))
		];
	}

	findById(_id: string): Aluno {
		return this.list().find(a => a._id === _id);
	}

	delete(_id: string): boolean {
		// TODO
		console.log('Delete aluno id:' + _id);
		return true;
	}
}
