import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Atendimento } from '../atendimento.model';
import { Aluno } from '../../alunos/aluno.model';

declare var $: any;

/**
 * AtendimentoItem
 * can be used by alunos or professores
 */
@Component({
	selector: 'app-atendimento-item',
	templateUrl: './atendimento-item.component.html'
})
export class AtendimentoItemComponent implements AfterViewInit {

	@Input() atendimento: Atendimento;
	@Input() selectedId: string;

	ngAfterViewInit() {
		$('.collapsible').collapsible();
	}
}
