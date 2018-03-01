export class Professor {
	constructor(
		public _id?: string,
		public nome?: string,
		public atendimentoTipos?: string[]) {}

	get atendimentoTiposFormatted() {
		let str = '';
		if (this.atendimentoTipos.length) {
			this.atendimentoTipos.forEach((atendimentoTipo, i) => {
				if (i === 0) {
					str = atendimentoTipo;
					return;
				}
				str += ` - ${atendimentoTipo}`;
			});
		}
		return str;
	}
}
