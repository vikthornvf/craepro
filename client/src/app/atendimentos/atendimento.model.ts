import { Aluno } from '../alunos/aluno.model';
import { Professor } from '../professores/professor.model';
import { Parecer } from './parecer.model';
import { Horario } from './horario.model';

export class Atendimento {

	constructor(
		public _id?: string,
		public tipo?: string,
		public aluno?: Aluno,
		public profissional?: Professor,
		public pareceres?: Parecer[],
		public solicitacao?: Date,
		public inicio?: Date,
		public egresso?: Date,
		public horario?: Horario) {
			if (!horario) {
				this.horario = new Horario();
			}
		}
}
