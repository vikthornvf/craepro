import { Endereco } from '../shared/endereco.model';

export class Escola {

	constructor(
		public _id?: string,
		public nome?: string,
		public qtdAlunos?: number,
		public telefones?: string[],
		public enderecos?: Endereco[]) {}
}
