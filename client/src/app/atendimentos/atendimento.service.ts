import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Atendimento } from './atendimento.model';
import { Observable } from 'rxjs/Observable';
import { AlunoService } from '../alunos/aluno.service';
import { ProfessorService } from '../professores/professor.service';

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
	headers: Headers;

	private atendimentos: Atendimento[] = [
		{
			_id: '1',
			tipo: 'A',
			status: 'Ativo',
			aluno: this.serviceAluno.findById('1'),
			profissional: this.serviceProfessor.findById('4'),
			parecer: 'Ta bacana',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '2',
			tipo: 'P',
			status: 'Em espera',
			aluno: this.serviceAluno.findById('2'),
			profissional: this.serviceProfessor.findById('2'),
			parecer: 'So esperando mesmo...',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '3',
			tipo: 'F',
			status: 'Em espera',
			aluno: this.serviceAluno.findById('1'),
			profissional: this.serviceProfessor.findById('3'),
			parecer: 'So esperando mesmo...',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '4',
			tipo: 'A',
			status: 'Ativo',
			aluno: this.serviceAluno.findById('3'),
			profissional: this.serviceProfessor.findById('4'),
			parecer: 'Show de bola',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '5',
			tipo: 'P',
			status: 'Em espera',
			aluno: this.serviceAluno.findById('4'),
			profissional: this.serviceProfessor.findById('2'),
			parecer: 'So esperando mesmo...',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '6',
			tipo: 'P',
			status: 'Ativo',
			aluno: this.serviceAluno.findById('5'),
			profissional: this.serviceProfessor.findById('2'),
			parecer: 'Bombando',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '7',
			tipo: 'A',
			status: 'Desligado',
			aluno: this.serviceAluno.findById('6'),
			profissional: this.serviceProfessor.findById('4'),
			parecer: 'Tudo ok',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '8',
			tipo: 'F',
			status: 'Ativo',
			aluno: this.serviceAluno.findById('6'),
			profissional: this.serviceProfessor.findById('3'),
			parecer: 'Recebendo bem o tratamento',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '9',
			tipo: 'P',
			status: 'Em espera',
			aluno: this.serviceAluno.findById('7'),
			profissional: this.serviceProfessor.findById('2'),
			parecer: 'Tem que morar mais perto da escola :(',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '10',
			tipo: 'F',
			status: 'Ativo',
			aluno: this.serviceAluno.findById('7'),
			profissional: this.serviceProfessor.findById('3'),
			parecer: 'Teste',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '11',
			tipo: 'A',
			status: 'Em espera',
			aluno: this.serviceAluno.findById('8'),
			profissional: this.serviceProfessor.findById('1'),
			parecer: 'Mora muito longe',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}, {
			_id: '12',
			tipo: 'A',
			status: 'Em espera',
			aluno: this.serviceAluno.findById('9'),
			profissional: this.serviceProfessor.findById('1'),
			parecer: 'Mora muito longe',
			solicitacao: new Date(),
			inicio: new Date(),
			alta: new Date()
		}
	];

	constructor(
		private http: Http,
		private serviceAluno: AlunoService,
		private serviceProfessor: ProfessorService) {

		this.headers = new Headers();
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
		return this.atendimentos.filter(a => a.aluno
			? (a.profissional._id === professorId)
			: false);
	}

	findById(_id: string): Atendimento {
		return this.atendimentos.find(a => a._id === _id);
	}

	delete(_id: string): boolean {
		// TODO
		console.log('Delete atendimento id: ' + _id);
		return true;
	}
}
