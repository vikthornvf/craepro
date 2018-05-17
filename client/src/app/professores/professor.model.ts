import { Endereco } from '../shared/endereco.model';

export class Professor {
	constructor(
		public _id?: string,
		public nome?: string,
		public atendimentoTipos?: string[],
		public telefones?: number[],
		public enderecos?: Endereco[]) {}

	get atendimentoTiposFormatted() {
		return this.atendimentoTipos.toString()
			.replace(',', ', ');
	}
}
