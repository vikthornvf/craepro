import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { Aluno } from '../aluno.model';
import { Escola } from '../../escolas/escola.model';
import { Professor } from '../../professores/professor.model';
import { Atendimento } from '../../atendimentos/atendimento.model';

@Component({
	selector: 'app-aluno',
	templateUrl: './aluno.component.html'
})
export class AlunoComponent implements OnInit {

	edit = false;
	aluno: Aluno = new Aluno();
	escolas: Escola[] = [];
	atendimentos: Atendimento[] = [];
	selectedAtendimento: Atendimento = new Atendimento();

	series: {}[];
	turnos: {}[];

	isDisabled = false;

	constructor(private service: AlunoService, private route: ActivatedRoute) { }

	print() {
		console.log(this.aluno);
	}

	ngOnInit() {
		this.loadSeries();
		this.loadTurnos();
		this.route.params.subscribe(params => {
			const _id = params['id'];
			if (_id) {
				this.loadAluno(_id);
				this.loadAtendimentos(_id);
			}
			this.loadEscolas();
		});
	}

	loadSeries() {
		// const series: { _id: number; nome: string}[] = [];
		// for (const e in SerieEnum) {
		// 	if (typeof SerieEnum[e] === 'number') {
		// 		series.push({ _id: <any>SerieEnum[e], nome: e});
		// 	}
		// }
		// this.series = series;
	}

	loadTurnos() {
		// const turnos: { _id: number; nome: string }[] = [];
		// for (const e in TurnoEnum) {
		// 	if (typeof TurnoEnum[e] === 'number') {
		// 		turnos.push({ _id: <any>TurnoEnum[e], nome: e});
		// 	}
		// }
		// this.turnos = turnos;
	}

	loadAluno(_id: string) {
		this.aluno = this.service.findById(_id);
	}

	onSelectEscola(_id: string) {
		this.aluno.escola = {};
		this.aluno.escola._id = _id;
	}

	loadEscolas() {
		// TODO
		this.escolas = [
			this.aluno.escola,
			{ _id: '2', nome: 'A Escola', qtdAlunos: 5 },
			{ _id: '3', nome: 'Colégio', qtdAlunos: 2 },
			{ _id: '4', nome: 'Educanddo', qtdAlunos: 1 },
			{ _id: '5', nome: 'Óia o Estudo', qtdAlunos: 3 },
			{ _id: '6', nome: 'Vamstudá', qtdAlunos: 6 }
		];
	}

	loadAtendimentos(_id: string) {
		// TODO
	}

	onSave() {
		// TODO
	}
}
