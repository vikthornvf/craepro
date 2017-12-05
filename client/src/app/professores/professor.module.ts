import { MaterializeSharedModule } from '../materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';
import { AppSharedModule } from '../app-shared/app-shared.module';

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
		MaterializeSharedModule,
		BrowserModule,
		FormsModule,
		NavModule,
		AtendimentoModule,
		AppSharedModule
	],
	providers: [ProfessorService]
})
export class ProfessorModule { }
