import { Component, NgZone } from '@angular/core';
import { ListViewComponent } from '../../shared/list-view.component';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { EscolaService } from '../escola.service';
import { Escola } from '../escola.model';

@Component({
	selector: 'app-escola-list',
	templateUrl: './escola-list.component.html',
	styleUrls: ['./escola-list.component.css']
})
export class EscolaListComponent extends ListViewComponent {

	escolas: Escola[] = [];

	constructor(
		zone: NgZone,
		navService: NavbarService,
		private service: EscolaService) { super(zone, navService); }

	loadList(): void {
		this.escolas = this.service.list();
	}

	getLink(): string {
		return 'escola';
	}
}
