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

	onSelect(professorId: string, headerEl: any) {
		this.selectedProfessorId = this.selectedProfessorId !== professorId
			? professorId
			: null;
	}

	onSelectProfessor(professorId: string, headerEl: any) {
		if (this.selectedProfessorId !== professorId) {
			this.selectedProfessorId = professorId;
			this.loadAtendimentos(professorId);
			return;
		}
		this.selectedProfessorId = null;
	}

	onSelectAtendimento(atendimentoId: string) {
		this.selectedAtendimentoId = this.selectedAtendimentoId !== atendimentoId
			? atendimentoId
			: null;
	}

	loadProfessores() {
		this.professores = this.service.list();
	}

	onSaveAtendimento() {
		// TODO
		// if (this.selectedAtendimentoId) save
		// else create;
	}

	loadAtendimentos(professorId: string) {
		this.atendimentos = [];
		this.isAtendimentosLoaded = false;
		// TODO load here
		this.atendimentos = this.serviceAtendimento.listByProfessor(professorId);
		this.isAtendimentosLoaded = true;
	}

	openModalAtendimento() {
		this.modalAtendimentoActions.emit({ action: 'modal', params: ['open'] });
	}

	getProfessorLink() {
		return `professor/${this.selectedProfessorId}`;
	}
}
