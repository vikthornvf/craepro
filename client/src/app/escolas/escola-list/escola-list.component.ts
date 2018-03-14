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

	link = 'escola';
	escolas: Escola[] = [];

	constructor(
		z: NgZone,
		ns: NavbarService,
		private service: EscolaService) { super(z, ns); }

	loadList(): void {
		this.escolas = this.service.list();
	}
}
