export class Professor {
	constructor(
		public _id?: string,
		public nome?: string,
		public atendimentoTipos?: string[]) {}

	get atendimentoTiposFormatted() {
		return this.atendimentoTipos.toString()
			.replace(',', ', ');
	}
}
