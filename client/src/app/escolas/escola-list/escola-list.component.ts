import { Component, NgZone } from '@angular/core';

import { ListViewComponent } from '../../shared/list-view.component';
import { EscolaService } from '../escola.service';
import { NavService } from '../../nav/nav.service';
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
		ns: NavService,
		private service: EscolaService) { super(z, ns); }

	loadList(): void {
		this.service.list().subscribe(
			escolas => {
				this.escolas = escolas;
				this.loaded = true;
			},
			err => console.log(err)
		);
	}

	clearSelection(): void {
		this.selectedId = null;
		this.onClose();
	}
}
