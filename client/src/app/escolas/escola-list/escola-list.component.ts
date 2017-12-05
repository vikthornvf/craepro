import { Component, OnInit, OnDestroy } from '@angular/core';
import { Escola } from '../escola.model';
import { EscolaService } from '../escola.service';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-escola-list',
	templateUrl: './escola-list.component.html',
	styleUrls: ['./escola-list.component.css']
})
export class EscolaListComponent implements OnInit, OnDestroy {

	keyword = '';
	keywordObservable: Subscription;
	selectedEscolaId = '';
	escolas: Escola[] = [];

	constructor(private service: EscolaService, private navProps: NavbarService) { }

	ngOnInit(): void {
		this.keywordObservable = this.navProps.keyword.subscribe(keyword => {
			this.selectedEscolaId = null;
			this.keyword = keyword;
		});
		this.navProps.changeNavbarSearch(true);
		this.loadEscolas();
	}

	ngOnDestroy(): void {
		this.keywordObservable.unsubscribe();
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

	getEscolaLink() {
		return `escola/${this.selectedEscolaId}`;
	}
}
