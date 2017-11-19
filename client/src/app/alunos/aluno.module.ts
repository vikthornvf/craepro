import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AtendimentoItemComponent } from '../atendimentos/atendimento-item/atendimento-item.component';

@NgModule({
	declarations: [
		AlunoListComponent,
		AtendimentoItemComponent
	],
	exports: [AlunoListComponent],
	imports: [BrowserModule],
	providers: []
})
export class AlunoModule { }
