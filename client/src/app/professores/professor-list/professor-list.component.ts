import { Component, OnInit, OnDestroy } from '@angular/core';
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

	constructor(private navProps: NavbarService) { }

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
		this.professores = [
			new Professor('1', 'Cris', ['AEE', 'Psicológico']),
			new Professor('2', 'Fernando', ['Psicológico']),
			new Professor('3', 'Luciano', ['AEE', 'Fonoaudiológico']),
			new Professor('4', 'Ramon', ['AEE']),
		];
	}

	onSelectProfessor(professorId: string) {
		this.loadAtendimentos(professorId);
		this.selectedProfessorId = this.selectedProfessorId !== professorId
			? professorId
			: null;
	}

	loadAtendimentos(professorId: string) {
		this.atendimentos = [
			new Atendimento('1', 'AEE', 'Ativo', 'Vikthor', '', 'Ta bacana', new Date(), new Date(), new Date()),
			new Atendimento('2', 'Psicologico', 'Em espera', 'Deisi', '', 'So esperando mesmo...', new Date(), new Date(), new Date())
		];
	}

	onSelectAtendimento(atendimentoId: string) {
		this.selectedAtendimentoId = this.selectedAtendimentoId !== atendimentoId
			? atendimentoId
			: null;
	}
}
