import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Professor } from './professor.model';
import { Observable } from 'rxjs/Observable';

/**
	ROUTES
	app.route('/api/professor')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/professor/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
 */
@Injectable()
export class ProfessorService {

	readonly url = 'api/professor';
	headers: Headers;

	private professores: Professor[] = [
		new Professor('1', 'Cris', ['A', 'P']),
		new Professor('2', 'Fernando', ['P']),
		new Professor('3', 'Luciano', ['A', 'F']),
		new Professor('4', 'Ramon', ['A']),
	];

	constructor(private http: Http) {
		this.headers = new Headers();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Professor[] {
		return this.professores.slice();
	}

	listByNomeAndTipoAtendimento(nome: string, tipo: string): Professor[] {
		nome = nome.toLowerCase();
		return this.professores.filter(p => (p.nome.toLowerCase().includes(nome) && p.atendimentoTipos.includes(tipo)));
	}

	findById(_id: string): Professor {
		return this.professores.find(p => p._id === _id);
	}

	delete(_id: string): boolean {
		// TODO
		console.log('Deleted professor id: ' + _id);
		return true;
	}
}
