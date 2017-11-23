import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';

import { ProfessorListComponent } from './professor-list/professor-list.component';

@NgModule({
	declarations: [
		ProfessorListComponent
	],
	exports: [
		ProfessorListComponent
	],
	imports: [
		BrowserModule,
		NavModule,
		AtendimentoModule
	],
	providers: []
})
export class ProfessorModule { }
