import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Atendimento } from '../atendimento.model';
import { Aluno } from '../../alunos/aluno.model';

/**
 * AtendimentoItem
 * can be used by alunos or professores
 */
@Component({
	selector: 'app-atendimento-item',
	templateUrl: './atendimento-item.component.html',
	styleUrls: ['./atendimento-item.component.css']
})
export class AtendimentoItemComponent implements OnInit {

	@Input() fonte: any;
	@Input() atendimento: Atendimento;
	@Input() selectedId: string;
	isAluno: boolean;

	ngOnInit(): void {
		if (!this.fonte) {
			return;
		}
		this.isAluno = (this.fonte.escola);
	}
}
