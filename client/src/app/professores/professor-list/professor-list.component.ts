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

	professores: Professor[] = [];

	constructor(
		zone: NgZone,
		navProps: NavbarService,
		private service: ProfessorService) { super(zone, navProps); }

	loadList(): void {
		this.professores = this.service.list();
	}

	getLink(): string {
		return 'professor';
	}
}
