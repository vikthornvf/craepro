export class Aluno {
	constructor(
		public _id: string,
		public nome: string,
		public escola: string,
		public status: string,
		public serie: string,
		public turno: string) { }

	get statusFormatted() {
		switch(this.status) {
			case 'A': return 'Ativo';
			case 'P': return 'Parcialmente Ativo';
			case 'E': return 'Em espera';
			case 'D': return 'Desligado';
		}
		return null;
	}

	get serieTurno() {
		return `${this.serie} - ${this.turno}`;
	}
}
