import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AtendimentoItemComponent } from './atendimento-item/atendimento-item.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';

@NgModule({
	declarations: [
		AtendimentoItemComponent,
		AtendimentoComponent
	],
	exports: [
		AtendimentoItemComponent,
		AtendimentoComponent
	],
	imports: [BrowserModule],
	providers: []
})
export class AtendimentoModule { }
