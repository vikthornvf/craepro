import { Escola } from '../escolas/escola.model';

export class Usuario {
	constructor(
		public _id?: string,
		public nome?: string,
		public email?: string,
		public escola?: Escola,
		public permissoes?: string[]) {}
}
