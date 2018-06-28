import { Component, NgZone } from '@angular/core';
import { ListViewComponent } from '../../shared/list-view.component';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { AlunoService } from '../aluno.service';
import { Aluno } from '../aluno.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { AtendimentoService } from '../../atendimentos/atendimento.service';

declare var $: any;

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
		private service: AlunoService,
		private attService: AtendimentoService) { super(z, ns); }

	loadList(): void {
		this.service.list().subscribe(
			alunos => {
				this.alunos = alunos;
				this.loaded = true;
			},
			err => console.log(err));
	}

	updateAlunoSituacao(aluno: Aluno) {
		this.attService.listByAluno(aluno._id).subscribe(
			atendimentos => this.updateSituacao(aluno, atendimentos),
			err => console.log(err));
	}

	updateSituacao(aluno: Aluno, atendimentos: Atendimento[]): void {
		if (aluno && atendimentos) {
			const o = this.service.updateSituacao(aluno, atendimentos);
			if (o) {
				o.subscribe(
					res => this.refreshTooltips(),
					err => console.log(err));
			}
			this.refreshTooltips();
		}
	}

	refreshTooltips() {
		$(document).ready(function(){
			$('.tooltipped').tooltip();
		});
	}
}
