import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';
import { FormActionsModule } from '../form-actions/form-actions.module';
import { PipesModule } from '../pipes/pipes.module';
import { NavModule } from '../nav/nav.module';
import { ResponsavelModule } from '../responsaveis/responsavel.module';
import { DirectivesModule } from '../shared/directives.module';
import { AlunoComponent } from './aluno/aluno.component';
import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoService } from './aluno.service';

@NgModule({
	declarations: [
		AlunoListComponent,
		AlunoComponent
	],
	exports: [],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		ReactiveFormsModule,
		NavModule,
		AtendimentoModule,
		ResponsavelModule,
		AddButtonModule,
		FormActionsModule,
		DirectivesModule,
		PipesModule,
	],
	providers: [AlunoService]
})
export class AlunoModule { }
