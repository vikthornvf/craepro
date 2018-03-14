import { Component, NgZone } from '@angular/core';
import { ListViewComponent } from '../../shared/list-view.component';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { AlunoService } from '../aluno.service';
import { Aluno } from '../aluno.model';

@Component({
	selector: 'app-aluno-list',
	templateUrl: './aluno-list.component.html',
	styleUrls: ['./aluno-list.component.css'],
})
export class AlunoListComponent extends ListViewComponent {

	link = 'aluno';
	alunos: Aluno[] = [];

	constructor(
		z: NgZone,
		ns: NavbarService,
		private service: AlunoService) { super(z, ns); }

	loadList(): void {
		this.alunos = this.service.list();
	}
}
