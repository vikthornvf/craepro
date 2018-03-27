export class Horario {

	constructor(
		public dia?: number,
		public horario?: string) {}

	public getHora(): string {
		const h = this.horario;
		if (h) {
			const i = h.indexOf(':');
			return h.slice(0, i);
		}
		return null;
	}

	public getMinutos(): string {
		const h = this.horario;
		if (h) {
			const i = h.indexOf(':');
			return h.slice(i + 1, h.length);
		}
		return null;
	}

	public getTurno(): string {
		const h = +this.getHora();
		if (h > 11) {
			return (h <= 18)
				? 'T'
				: 'N';
		}
		return 'M';
	}
}
