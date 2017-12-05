import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { AtendimentoService } from '../../atendimentos/atendimento.service';
import { Professor } from '../professor.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-professor-list',
	templateUrl: './professor-list.component.html',
	styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit, OnDestroy {

	keyword = '';
	keywordObservable: Subscription;
	professores: Professor[] = [];
	selectedProfessorId = '';
	atendimentos: Atendimento[] = [];
	selectedAtendimentoId = '';
	isAtendimentosLoaded = false;

	modalAtendimentoActions = new EventEmitter<string|MaterializeAction>();
	modalAtendimentoParams = [{ dismissible: false }];

	constructor(
		private service: ProfessorService,
		private serviceAtendimento: AtendimentoService,
		private navProps: NavbarService) { }

	ngOnInit(): void {
		this.keywordObservable = this.navProps.keyword.subscribe(keyword => {
			this.selectedProfessorId = null;
			this.keyword = keyword;
		});
		this.navProps.changeNavbarSearch(true);
		this.loadProfessores();
	}

	ngOnDestroy(): void {
		this.keywordObservable.unsubscribe();
		this.navProps.changeNavbarSearch(false);
	}

	loadProfessores() {
		this.professores = this.service.list();
	}

	onSelectProfessor(professorId: string) {
		if (this.selectedProfessorId !== professorId) {
			this.selectedProfessorId = professorId;
			this.loadAtendimentos(professorId);
			return;
		}
		this.selectedProfessorId = null;
		setTimeout(() => this.atendimentos = [], 300);
	}

	getProfessorLink() {
		return `professor/${this.selectedProfessorId}`;
	}

	loadAtendimentos(professorId: string) {
		this.atendimentos = [];
		this.isAtendimentosLoaded = false;
		// TODO load here
		this.atendimentos = this.serviceAtendimento.listByProfessor(professorId);
		this.isAtendimentosLoaded = true;
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
