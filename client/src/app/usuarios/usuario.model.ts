import { Escola } from '../escolas/escola.model';

export class Usuario {
	constructor(
		public _id?: string,
		public nome?: string,
		public email?: string,
		public escola?: Escola,
		public tipo?: string,
		public permissoes?: string[],
		public solicitado?: boolean,
		public senha?: string) {}
}
