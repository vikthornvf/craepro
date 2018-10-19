import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from '../../alunos/aluno.service';
import { Aluno } from '../../alunos/aluno.model';

@Component({
	selector: 'app-alunos-em-espera',
	templateUrl: './alunos-em-espera.component.html'
})
export class AlunosEmEsperaComponent implements OnInit {

	loaded: boolean;
	alunos: Aluno[];

	constructor(
		private alunoService: AlunoService,
		private router: Router) {}

	ngOnInit() {
		this.alunoService.listBySituacao('E')
			.subscribe((alunos) => {
				this.alunos = alunos;
				this.loaded = true;
			});
	}

	onViewUusario(aluno: Aluno) {
		if (aluno) {
			this.router.navigateByUrl('/alunos/aluno/' + aluno._id);
		}
	}
}
