import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Component, EventEmitter, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { AtendimentoService } from '../../atendimentos/atendimento.service';
import { Aluno } from '../aluno.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { AtendimentoModule } from '../../atendimentos/atendimento.module';
import { NavbarService } from '../../nav/navbar/navbar.service';

declare var $: any;

@Component({
	selector: 'app-aluno-list',
	templateUrl: './aluno-list.component.html',
	styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit, OnDestroy, AfterViewInit {

	keyword = '';
	alunos: Aluno[] = [];
	selectedAlunoId = '';

	atendimentos: Atendimento[] = [];
	selectedAtendimentoId = '';

	modalAtendimentoActions = new EventEmitter<string|MaterializeAction>();
	modalAtendimentoParams = [{ dismissible: false }];

	constructor(
		private service: AlunoService,
		private serviceAtendimento: AtendimentoService,
		private navProps: NavbarService) { }

	ngOnInit(): void {
		this.navProps.keyword.subscribe(keyword => this.keyword = keyword);
		this.navProps.changeNavbarSearch(true);
		this.loadAlunos();
	}

	ngOnDestroy(): void {
		this.navProps.changeNavbarSearch(false);
	}

	ngAfterViewInit(): void {
		$('.tooltipped').tooltip();
	}

	loadAlunos() {
		// this.service.list()
		// 	.subscribe(
		// 		alunos => this.alunos = alunos,
		// 		err => console.log(err));
		this.alunos = this.service.list();
	}

	onSelectAluno(alunoId: string) {
		if (this.selectedAlunoId !== alunoId) {
			this.selectedAlunoId = alunoId;
			this.loadAtendimentos(alunoId);
			return;
		}
		this.selectedAlunoId = null;
		this.atendimentos = [];
	}

	getAlunoLink() {
		return `aluno/${this.selectedAlunoId}`;
	}

	loadAtendimentos(alunoId: string) {
		this.atendimentos = this.serviceAtendimento.listByAluno(alunoId);
	}

	onSelectAtendimento(atendimentoId: string) {
		this.selectedAtendimentoId = this.selectedAtendimentoId !== atendimentoId
			? atendimentoId
			: null;
	}

	openModalAtendimento() {
		this.modalAtendimentoActions.emit({ action: 'modal', params: ['open'] });
	}

	onSaveAtendimento() {
		// TODO
		// if (this.selectedAtendimentoId) save
		// else create;
	}
}
