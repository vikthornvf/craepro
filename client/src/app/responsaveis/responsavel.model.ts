import { Aluno } from '../alunos/aluno.model';
import { Endereco } from '../shared/endereco.model';

export class Responsavel {

	constructor(
		public _id?: string,
		public aluno?: Aluno,
		public nome?: string,
		public parentesco?: string,
		public telefones?: string[],
		public enderecos?: Endereco[]) {}
}
