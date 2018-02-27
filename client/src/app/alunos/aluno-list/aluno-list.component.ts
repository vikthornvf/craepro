import { Component, OnInit, OnDestroy, EventEmitter, ViewChild, NgZone } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { AtendimentoService } from '../../atendimentos/atendimento.service';
import { Aluno } from '../aluno.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { Subscription } from 'rxjs/Subscription';
import { AtendimentoModalComponent } from '../../atendimentos/atendimento-modal/atendimento-modal.component';
import { ListViewComponent } from '../../shared/list-view.component';

@Component({
	selector: 'app-aluno-list',
	templateUrl: './aluno-list.component.html',
	styleUrls: ['./aluno-list.component.css'],
})
export class AlunoListComponent extends ListViewComponent implements OnInit, OnDestroy {

	alunos: Aluno[] = [];

	constructor(
		zone: NgZone,
		navProps: NavbarService,
		private service: AlunoService) {
			super(zone, navProps);
	}

	loadList(): void {
		this.alunos = this.service.list();
	}

	onSelect(alunoId: string) {
		this.selectedId = alunoId;
	}

	getEditLink() {
		return `aluno/${this.selectedId}`;
	}
}
