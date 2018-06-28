import { Component, NgZone } from '@angular/core';
import { ListViewComponent } from '../../shared/list-view.component';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { ProfessorService } from '../professor.service';
import { Professor } from '../professor.model';

@Component({
	selector: 'app-professor-list',
	templateUrl: './professor-list.component.html',
	styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent extends ListViewComponent {

	link = 'professor';
	professores: Professor[] = [];

	constructor(
		z: NgZone,
		ns: NavbarService,
		private service: ProfessorService) { super(z, ns); }

	loadList(): void {
		this.service.list().subscribe(
			professores => {
				this.professores = professores;
				this.loaded = true;
			},
			err => console.log(err));
	}
}
