import { Component } from '@angular/core';
import { Aluno } from '../aluno.model';

@Component({
	selector: 'app-aluno',
	templateUrl: './aluno.component.html'
})
export class AlunoComponent {

	aluno = new Aluno('6', 'Vikthor', 'Escola', 'A', '2', 'Tarde');
}
