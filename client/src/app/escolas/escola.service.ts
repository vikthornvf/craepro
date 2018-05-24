import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Escola } from './escola.model';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable()
export class EscolaService {

	readonly url = 'api/escolas';
	headers: HttpHeaders;

	idCount = 7; // TODO delete

	private escolas: Escola[] = [
		new Escola('1', 'Escolinha', 4, [], []),
		new Escola('2', 'A Escola', 5, [], []),
		new Escola('3', 'Colégio', 2, [], []),
		new Escola('4', 'Educanddo', 1, [], []),
		new Escola('5', 'Óia o Estudo', 3, [], []),
		new Escola('6', 'Vamstudá', 6, [], [])
	];

	constructor(
		private http: HttpClient,
		private dialogs: DialogsService) {
		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Escola[] {
		return this.escolas.slice();
	}

	findById(id: string): Escola {
		return this.escolas.find(
			escola => escola._id === id);
	}

	save(escola: Escola): Escola {
		let msg: string;

		if (escola._id) {
			const attIndex = this.escolas.find(a => a._id === escola._id);
			const index = this.escolas.indexOf(attIndex);
			this.escolas[index] = escola;
			msg = `Dados de escola(a) ${escola.nome} salvos com sucesso!`;
		} else {
			escola._id = this.idCount + '';
			this.escolas.push(escola);
			this.idCount++;
			msg = `Escola ${escola.nome} salvo com sucesso!`;
		}
		this.dialogs.toastSuccess(msg);
		return escola;
	}

	delete(id: string): boolean {
		// TODO review
		this.escolas = this.escolas.filter(e => e._id !== id);
		this.dialogs.toastSuccess('Escola excluída com sucesso!');
		return true;
	}
}

