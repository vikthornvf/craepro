import { Escola } from '../escolas/escola.model';

export class Aluno {

	constructor(
		public _id?: string,
		public nome?: string,
		public situacao?: string,
		public serie?: string,
		public turno?: string,
		public escola?: Escola) {}
}
