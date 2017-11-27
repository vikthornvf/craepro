import { Escola } from '../escolas/escola.model';

export class Aluno {

	constructor(
		public _id?: string,
		public nome?: string,
		public status?: string, // TENTAR RESOLVER NO SERVER
		public serie?: string,
		public turno?: string,
		public escola?: Escola) { }

	get statusFormatted() {
		switch (this.status) {
			case 'A': return 'Ativo';
			case 'P': return 'Parcialmente Ativo';
			case 'E': return 'Em espera';
			case 'D': return 'Desligado';
		}
		return '';
	}

	get serieTurno() {
		return `${this.serie} - ${this.turno}`;
	}
}
