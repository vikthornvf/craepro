import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { AtendimentoService } from '../../atendimentos/atendimento.service';
import { Aluno } from '../aluno.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { Subscription } from 'rxjs/Subscription';
import { AtendimentoModalComponent } from '../../atendimentos/atendimento-modal/atendimento-modal.component';

@Component({
	selector: 'app-aluno-list',
	templateUrl: './aluno-list.component.html',
	styleUrls: ['./aluno-list.component.css'],
})
export class AlunoListComponent implements OnInit, OnDestroy {

	keyword = '';
	keywordObservable: Subscription;
	alunos: Aluno[] = [];
	selectedAlunoId = '';
	atendimentos: Atendimento[] = [];
	selectedAtendimentoId = '';
	isAtendimentosLoaded = false;

	constructor(
		private service: AlunoService,
		private serviceAtendimento: AtendimentoService,
		private navProps: NavbarService) { }

	ngOnInit(): void {
		this.keywordObservable = this.navProps.keyword.subscribe(keyword => {
			this.selectedAlunoId = null;
			this.keyword = keyword;
		});
		this.navProps.changeNavbarSearch(true);
		this.loadAlunos();
	}

	ngOnDestroy(): void {
		this.keywordObservable.unsubscribe();
		this.navProps.changeNavbarSearch(false);
	}

	loadAlunos() {
		// this.service.list()
		// 	.subscribe(
		// 		alunos => this.alunos = alunos,
		// 		err => console.log(err));
		this.alunos = this.service.list();
	}

	onSelect(alunoId: string) {
		this.selectedAlunoId = this.selectedAlunoId !== alunoId
			? alunoId
			: null;
	}

	onSelectAluno(alunoId: string) {
		if (this.selectedAlunoId !== alunoId) {
			this.selectedAlunoId = alunoId;
			this.loadAtendimentos(alunoId);
			return;
		}
		this.selectedAlunoId = null;
	}

	getAlunoLink() {
		return `aluno/${this.selectedAlunoId}`;
	}

	loadAtendimentos(alunoId: string) {
		this.atendimentos = [];
		this.isAtendimentosLoaded = false;
		// TODO load here
		this.atendimentos = this.serviceAtendimento.listByAluno(alunoId);
		this.isAtendimentosLoaded = true;
	}

	onSelectAtendimento(atendimentoId: string) {
		this.selectedAtendimentoId = this.selectedAtendimentoId !== atendimentoId
			? atendimentoId
			: null;
	}

	onSaveAtendimento() {
		// TODO
		// if (this.selectedAtendimentoId) save
		// else create;
	}
}
