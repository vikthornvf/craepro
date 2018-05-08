import { Endereco } from '../shared/endereco.model';

export class Responsavel {

	constructor(
		public _id?: string,
		public nome?: string,
		public parentesco?: string,
		public telefones?: number[],
		public enderecos?: Endereco[]) {}
}
