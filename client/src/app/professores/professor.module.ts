import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';

import { ProfessorListComponent } from './professor-list/professor-list.component';

import { ProfessorService } from './professor.service';

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
	providers: [ProfessorService]
})
export class ProfessorModule { }
