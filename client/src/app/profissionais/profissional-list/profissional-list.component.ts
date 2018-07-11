import { Component, NgZone } from '@angular/core';
import { ListViewComponent } from '../../shared/list-view.component';
import { NavService } from '../../nav/nav.service';
import { ProfissionalService } from '../profissional.service';
import { Profissional } from '../profissional.model';

@Component({
	selector: 'app-profissional-list',
	templateUrl: './profissional-list.component.html',
	styleUrls: ['./profissional-list.component.css']
})
export class ProfissionalListComponent extends ListViewComponent {

	link = 'profissional';
	profissionais: Profissional[] = [];

	constructor(
		z: NgZone,
		ns: NavService,
		private service: ProfissionalService) { super(z, ns); }

	loadList(): void {
		this.service.list().subscribe(
			profissionais => {
				this.profissionais = profissionais;
				this.loaded = true;
			},
			err => console.log(err));
	}
}
