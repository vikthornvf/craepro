import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Professor } from './professor.model';
import { DialogsService } from '../dialogs/dialogs.service';

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
	headers: HttpHeaders;

	idCount = 5; // TODO delete

	private professores: Professor[] = [
		new Professor('1', 'Cris', ['A', 'P'], [], []),
		new Professor('2', 'Fernando', ['P'], [], []),
		new Professor('3', 'Luciano', ['A', 'F'], [], []),
		new Professor('4', 'Ramon', ['A'], [], []),
	];

	constructor(
		private http: HttpClient,
		private dialogs: DialogsService) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Professor[] {
		return this.professores.slice();
	}

	listByNomeAndTipoAtendimento(nome: string, tipo: string): Professor[] {
		if (nome) {
			nome = nome.toLowerCase();
			return this.professores.filter(p => (p.nome.toLowerCase().includes(nome) && p.atendimentoTipos.includes(tipo)));
		}
		return this.professores.filter(p => p.atendimentoTipos.includes(tipo));
	}

	findById(id: string): Professor {
		return this.professores.find(p => p._id === id);
	}

	save(professor: Professor): Professor {
		let msg: string;

		if (professor._id) {
			const attIndex = this.professores.find(a => a._id === professor._id);
			const index = this.professores.indexOf(attIndex);
			this.professores[index] = professor;
			msg = `Dados de professor(a) ${professor.nome} salvos com sucesso!`;
		} else {
			professor._id = this.idCount + '';
			this.professores.push(professor);
			this.idCount++;
			msg = `Professor(a) ${professor.nome} salvo com sucesso!`;
		}
		this.dialogs.toastSuccess(msg);
		return professor;
	}

	delete(id: string): boolean {
		this.professores = this.professores.filter(e => e._id !== id);
		this.dialogs.toastSuccess('Professor excluído com sucesso!');
		return true;
	}
}
