export class Atendimento {
	constructor(
		public _id: string,
		public tipo: string,
		public status: string,
		public aluno: string,
		public profissional: string,
		public parecer: string,
		public solicitacao: Date,
		public inicio: Date,
		public alta: Date
	) { }
}
