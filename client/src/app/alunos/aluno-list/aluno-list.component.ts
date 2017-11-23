import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Component, EventEmitter, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
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

	constructor(private navProps: NavbarService) { }

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
		this.alunos = [
			new Aluno('1', 'Adão', 'Escola', 'D', '9', 'Tarde'),
			new Aluno('2', 'Rosângela', 'Escola', 'P', '9', 'Manha'),
			new Aluno('3', 'Allan', 'Escola', 'A', '6', 'Manha'),
			new Aluno('4', 'Yuri', 'Escola', 'A', '5', 'Noite'),
			new Aluno('5', 'Thiagus', 'Escola', 'A', '4', 'Tarde'),
			new Aluno('6', 'Vikthor', 'Escola', 'A', '2', 'Tarde'),
			new Aluno('7', 'Deisi', 'Escola', 'A', '2', 'Tarde'),
			new Aluno('8', 'Isaac', 'Escola', 'E', '1', 'Manha'),
			new Aluno('9', 'Ícaro', 'Escola', 'E', '1', 'Manha')
		];
	}

	onSelectAluno(alunoId: string) {
		this.loadAtendimentos(alunoId);
		this.selectedAlunoId = this.selectedAlunoId !== alunoId
			? alunoId
			: null;
	}

	getAlunoLink() {
		console.log(`aluno/${this.selectedAlunoId}`);
		return `aluno/${this.selectedAlunoId}`;
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

	openModalAtendimento() {
		this.modalAtendimentoActions.emit({ action: 'modal', params: ['open'] });
	}

	onSaveAtendimento() {
		// TODO
		// if (this.selectedAtendimentoId) save
		// else create;
	}
}
