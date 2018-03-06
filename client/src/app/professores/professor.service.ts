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
		new Professor('1', 'Cris', ['AEE', 'Psicológico']),
		new Professor('2', 'Fernando', ['Psicológico']),
		new Professor('3', 'Luciano', ['AEE', 'Fonoaudiológico']),
		new Professor('4', 'Ramon', ['AEE']),
	];

	constructor(private http: Http) {
		this.headers = new Headers();
		this.headers.append('Content-type', 'application/json');
	}

	list() {
		return this.professores.slice();
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
