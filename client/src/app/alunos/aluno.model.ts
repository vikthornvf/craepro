import { Escola } from '../escolas/escola.model';

export class Aluno {

	constructor(
		public _id?: string,
		public nome?: string,
		public status?: string, // TENTAR RESOLVER NO SERVER
		public serie?: string,
		public turno?: string,
		public escola?: Escola) {
			this.escola = escola ? escola : new Escola();
		}
}
