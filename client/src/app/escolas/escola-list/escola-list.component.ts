import { Component, OnInit, OnDestroy } from '@angular/core';
import { Escola } from '../escola.model';
import { NavbarService } from '../../nav/navbar/navbar.service';

@Component({
	selector: 'app-escola-list',
	templateUrl: './escola-list.component.html',
	styleUrls: ['./escola-list.component.css']
})
export class EscolaListComponent implements OnInit, OnDestroy {

	keyword = '';
	selectedEscolaId = '';
	escolas: Escola[] = [];

	constructor(private navProps: NavbarService) { }

	ngOnInit(): void {
		this.navProps.keyword.subscribe(keyword => this.keyword = keyword);
		this.navProps.changeNavbarSearch(true);
		this.loadEscolas();
	}

	ngOnDestroy(): void {
		this.navProps.changeNavbarSearch(false);
	}

	onChangeKeyword(keyword: string) {
		this.keyword = keyword;
	}

	loadEscolas() {
		this.escolas = [
			new Escola('1', 'Escolinha', 4),
			new Escola('2', 'A Escola', 5),
			new Escola('3', 'Colégio', 2),
			new Escola('4', 'Educanddo', 1),
			new Escola('5', 'Óia o Estudo', 3),
			new Escola('6', 'Vamstudá', 6),
		];
	}

	onSelectEscola(escolaId: string) {
		this.selectedEscolaId = this.selectedEscolaId !== escolaId
			? escolaId
			: null;
	}
}
