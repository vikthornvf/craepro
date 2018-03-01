import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { EscolaService } from '../../escolas/escola.service';
import { Aluno } from '../aluno.model';
import { Escola } from '../../escolas/escola.model';
import { Professor } from '../../professores/professor.model';
import { Atendimento } from '../../atendimentos/atendimento.model';

@Component({
	selector: 'app-aluno',
	templateUrl: './aluno.component.html',
})
export class AlunoComponent implements OnInit {

	edit = true;
	aluno: Aluno;
	atendimentos: Atendimento[];
	escolas: Escola[];

	constructor(
		private service: AlunoService,
		private escolaService: EscolaService,
		private route: ActivatedRoute) {}

	print(print: any) {
		console.log(print);
		console.log(print.escola._id);
	}

	ngOnInit() {
		this.loadEscolas();
		this.loadSeries();
		this.loadTurnos();
		this.route.params.subscribe(params => {
			const id = params['id'];
			if (id) {
				this.loadAluno(id);
				this.loadAtendimentos(id);
				this.edit = false;
			} else {
				this.initAluno();
			}
		});
	}

	initAluno() {
		this.aluno = new Aluno();
		this.aluno.escola = new Escola();
	}

	toggleEdit() {
		this.edit = !this.edit;
	}

	onEdtitName(key: string) {
		if (key === 'Enter' || key === 'Escape') {
			if (this.aluno.nome) {
				this.toggleEdit();
			}
		}
	}

	loadSeries() {

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

	loadEscolas() {
		this.escolas = this.escolaService.list();
	}

	loadAtendimentos(_id: string) {
		// TODO
	}

	onSave() {
		// TODO
	}
}
