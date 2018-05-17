import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { DirectivesModule } from '../shared/directives.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { TelefoneModule } from '../telefone/telefone.module';
import { EnderecoModule } from '../endereco/endereco.module';

import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfessorComponent } from './professor/professor.component';

import { ProfessorService } from './professor.service';

@NgModule({
	declarations: [
		ProfessorListComponent,
		ProfessorComponent
	],
	exports: [],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		ReactiveFormsModule,
		NavModule,
		DirectivesModule,
		AtendimentoModule,
		AddButtonModule,
		TelefoneModule,
		EnderecoModule,
	],
	providers: [ProfessorService]
})
export class ProfessorModule { }
