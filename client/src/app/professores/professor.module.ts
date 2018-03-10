import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { DeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';

import { ProfessorListComponent } from './professor-list/professor-list.component';

import { ProfessorService } from './professor.service';

@NgModule({
	declarations: [
		ProfessorListComponent
	],
	exports: [],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		ReactiveFormsModule,
		NavModule,
		AtendimentoModule,
		AddButtonModule,
		DeleteConfirmationModule
	],
	providers: [ProfessorService]
})
export class ProfessorModule { }
