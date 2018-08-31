import { Endereco } from '../shared/endereco.model';

export class Profissional {
	constructor(
		public _id?: string,
		public nome?: string,
		public atendimentoTipos?: string[],
		public telefones?: number[],
		public enderecos?: Endereco[]) {}
}
