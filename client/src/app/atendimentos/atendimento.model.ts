import { Aluno } from '../alunos/aluno.model';
import { Professor } from '../professores/professor.model';

export class Atendimento {

	constructor(
		public _id?: string,
		public tipo?: string,
		public status?: string,
		public aluno?: Aluno,
		public profissional?: Professor,
		public parecer?: string,
		public solicitacao?: Date,
		public inicio?: Date,
		public alta?: Date) { }
}
