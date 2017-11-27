import { Component, OnInit, OnDestroy } from '@angular/core';
import { Escola } from '../escola.model';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { EscolaService } from '../escola.service';

@Component({
	selector: 'app-escola-list',
	templateUrl: './escola-list.component.html',
	styleUrls: ['./escola-list.component.css']
})
export class EscolaListComponent implements OnInit, OnDestroy {

	keyword = '';
	selectedEscolaId = '';
	escolas: Escola[] = [];

	constructor(private service: EscolaService, private navProps: NavbarService) { }

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
		this.escolas = this.service.list();
	}

	onSelectEscola(escolaId: string) {
		this.selectedEscolaId = this.selectedEscolaId !== escolaId
			? escolaId
			: null;
	}
}
