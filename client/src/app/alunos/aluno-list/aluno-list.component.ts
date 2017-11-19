import { Component, OnInit } from '@angular/core';
import { Aluno } from '../aluno.model';
import { Atendimento } from '../../atendimentos/atendimento.model';

@Component({
	selector: 'app-aluno-list',
	templateUrl: './aluno-list.component.html',
	styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {

	selectedAlunoId = '';
	selectedAtendimentoId = '';
	alunos: Aluno[] = [];
	atendimentos: Atendimento[] = [];

	ngOnInit(): void {
		// TODO load alunos
		this.alunos = [
			new Aluno('1', 'Adão', 'Escola', 'D', '9', 'Tarde'),
			new Aluno('2', 'Rosângela', 'Escola', 'P', '9', 'Manha'),
			new Aluno('3', 'Allan', 'Escola', 'A', '6', 'Manha'),
			new Aluno('4', 'Yuri', 'Escola', 'A', '5', 'Noite'),
			new Aluno('5', 'Thiagus', 'Escola', 'A', '4', 'Tarde'),
			new Aluno('6', 'Vikthor', 'Escola', 'A', '2', 'Tarde'),
			new Aluno('7', 'Isaac', 'Escola', 'E', '1', 'Manha'),
			new Aluno('8', 'Ícaro', 'Escola', 'E', '1', 'Manha')
		];
	}

	loadAlunos() {
		// this.alunos =
	}

	onSelectAluno(alunoId: string) {
		this.loadAtendimentos(alunoId);
		this.selectedAlunoId = this.selectedAlunoId !== alunoId
			? alunoId
			: null;
	}

	loadAtendimentos(alunoId: string) {
		this.atendimentos = [
			new Atendimento('1', 'AEE', 'Ativo', '', 'Cris', 'Ta bacana', new Date(), new Date(), new Date()),
			new Atendimento('2', 'Psicologico', 'Em espera', '', 'Fernando', 'So esperando mesmo...', new Date(), new Date(), new Date())
		];
	}

	onSelectAtendimento(atendimentoId: string) {
		this.selectedAtendimentoId = this.selectedAtendimentoId !== atendimentoId
			? atendimentoId
			: null;
	}
}
