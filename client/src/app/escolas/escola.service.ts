import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Escola } from './escola.model';

@Injectable()
export class EscolaService {

	readonly url = 'api/escolas';
	headers: Headers;
	http: Http;

	constructor(http: Http) {

		this.http = http;
		this.headers = new Headers();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Escola[] {
		return [
			{ _id: '1', nome: 'Escolinha', qtdAlunos: 4 },
			{ _id: '2', nome: 'A Escola', qtdAlunos: 5 },
			{ _id: '3', nome: 'Colégio', qtdAlunos: 2 },
			{ _id: '4', nome: 'Educanddo', qtdAlunos: 1 },
			{ _id: '5', nome: 'Óia o Estudo', qtdAlunos: 3 },
			{ _id: '6', nome: 'Vamstudá', qtdAlunos: 6 }
		];
	}

	findById(_id: string): Escola {
		return this.list().find(
			escola => escola._id === _id);
	}

	delete(_id: string): boolean {
		// TODO
		console.log('Deleted escola id: ' + _id);
		return true;
	}
}

