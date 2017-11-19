export class Aluno {
	constructor(
		public _id: string,
		public nome: string,
		public escola: string,
		public status: string,
		public serie: string,
		public turno: string) { }

	get serieTurno() {
		return `${this.serie} - ${this.turno}`;
	}
}
