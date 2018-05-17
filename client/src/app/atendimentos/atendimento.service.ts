import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlunoService } from '../alunos/aluno.service';
import { ProfessorService } from '../professores/professor.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { Atendimento } from './atendimento.model';
import { Parecer } from './parecer.model';
import { Horario } from './horario.model';

/**
	ROUTES
	app.get('/api/atendimento/aluno/:alunoId', controller.list);
	app.get('/api/atendimento/professor/:professorId', controller.list);

	app.route('/api/atendimento')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/atendimento/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
 */
@Injectable()
export class AtendimentoService {

	readonly url = 'api/atendimento';
	headers: HttpHeaders;

	private atendimentos: Atendimento[] = [
		new Atendimento(
			'1',
			'A',
			this.serviceAluno.findById('1'),
			this.serviceProfessor.findById('4'),
			[new Parecer('Ta bacana1'), new Parecer('Ta bacana2')],
			new Date(),
			new Date(),
			new Date(),
			new Horario(1, '16:30')),
		new Atendimento(
			'2',
			'P',
			this.serviceAluno.findById('2'),
			this.serviceProfessor.findById('2'),
			[new Parecer('So esperando mesmo...'), new Parecer('So esperando mesmo...2')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'3',
			'F',
			this.serviceAluno.findById('1'),
			this.serviceProfessor.findById('3'),
			[new Parecer('So esperando mesmo...3'), new Parecer('So esperando mesmo...4')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'4',
			'A',
			this.serviceAluno.findById('3'),
			this.serviceProfessor.findById('4'),
			[new Parecer('Show de bola'), new Parecer('Show de bola2')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'5',
			'P',
			this.serviceAluno.findById('4'),
			this.serviceProfessor.findById('2'),
			[new Parecer('So esperando mesmo...5'), new Parecer('So esperando mesmo...6')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'6',
			'P',
			this.serviceAluno.findById('5'),
			this.serviceProfessor.findById('2'),
			[new Parecer('Bombando'), new Parecer('Bombando2')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'7',
			'A',
			this.serviceAluno.findById('6'),
			this.serviceProfessor.findById('4'),
			[new Parecer('Tudo ok'), new Parecer('Tudo ok2')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'8',
			'F',
			this.serviceAluno.findById('6'),
			this.serviceProfessor.findById('3'),
			[new Parecer('Recebendo bem o tratamento'), new Parecer('Recebendo bem o tratamento2')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'9',
			'P',
			this.serviceAluno.findById('7'),
			this.serviceProfessor.findById('2'),
			[new Parecer('Tem que morar mais perto da escola :('), new Parecer('Tem que morar mais perto da escola2')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'10',
			'F',
			this.serviceAluno.findById('7'),
			this.serviceProfessor.findById('3'),
			[new Parecer('Teste'), new Parecer('Teste2')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'11',
			'A',
			this.serviceAluno.findById('8'),
			this.serviceProfessor.findById('1'),
			[new Parecer('Mora muito longe'), new Parecer('Mora muito longe2')],
			new Date(),
			new Date(),
			new Date()),
		new Atendimento(
			'12',
			'A',
			this.serviceAluno.findById('9'),
			this.serviceProfessor.findById('1'),
			[new Parecer('Mora muito longe3'), new Parecer('Mora muito longe4')],
			new Date(),
			new Date(),
			new Date())
	];
	idCount = 13; // TODO delete

	constructor(
		private http: HttpClient,
		private serviceAluno: AlunoService,
		private serviceProfessor: ProfessorService,
		private dialogs: DialogsService) {

		this.headers = new HttpHeaders();
		this.headers.append('Content-type', 'application/json');
	}

	list(): Atendimento[] {
		return this.atendimentos.slice();
	}

	listByAluno(alunoId: string): Atendimento[] {
		return this.atendimentos.filter(a => a.aluno
			? (a.aluno._id === alunoId)
			: false);
	}

	listByProfessor(professorId: string): Atendimento[] {
		return this.atendimentos.filter(a => a.profissional
			? (a.profissional._id === professorId)
			: false);
	}

	findById(_id: string): Atendimento {
		return this.atendimentos.find(a => a._id === _id);
	}

	save(atendimento: Atendimento): Atendimento {
		let msg: string;

		if (atendimento._id) {
			const attIndex = this.atendimentos.find(a => a._id === atendimento._id);
			const index = this.atendimentos.indexOf(attIndex);
			this.atendimentos[index] = atendimento;
			msg = 'Dados do atendimento alterados com sucesso!';
		}
		else {
			atendimento._id = this.idCount + '';
			this.atendimentos.unshift(atendimento);
			this.idCount++;
			msg = 'Atendimento criado com sucesso!';
		}
		this.dialogs.toastSuccess(msg);
		return atendimento;
	}

	delete(_id: string): boolean {
		// TODO
		this.atendimentos = this.atendimentos.filter(a => a._id !== _id);
		this.dialogs.toastSuccess('Atendimento excluído com sucesso!');
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
