import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { AtendimentoService } from '../../atendimentos/atendimento.service';
import { Professor } from '../professor.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { NavbarService } from '../../nav/navbar/navbar.service';

@Component({
	selector: 'app-professor-list',
	templateUrl: './professor-list.component.html',
	styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit, OnDestroy {

	keyword = '';
	selectedProfessorId = '';
	selectedAtendimentoId = '';
	professores: Professor[] = [];
	atendimentos: Atendimento[] = [];

	constructor(
		private service: ProfessorService,
		private serviceAtendimento: AtendimentoService,
		private navProps: NavbarService) { }

	ngOnInit(): void {
		this.navProps.keyword.subscribe(keyword => this.keyword = keyword);
		this.navProps.changeNavbarSearch(true);
		this.loadProfessores();
	}

	ngOnDestroy(): void {
		this.navProps.changeNavbarSearch(false);
	}

	onChangeKeyword(keyword: string) {
		this.keyword = keyword;
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
		this.atendimentos = [];
	}

	loadAtendimentos(professorId: string) {
		this.atendimentos = this.serviceAtendimento.listByProfessor(professorId);
	}

	onSelectAtendimento(atendimentoId: string) {
		this.selectedAtendimentoId = this.selectedAtendimentoId !== atendimentoId
			? atendimentoId
			: null;
	}
}
