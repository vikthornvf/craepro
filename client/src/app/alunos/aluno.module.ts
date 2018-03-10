import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';
import { DirectivesModule } from '../shared/directives.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { DeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';

import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoComponent } from './aluno/aluno.component';

import { AlunoService } from './aluno.service';
import { ResponsavelComponent } from './aluno/responsavel.component';

@NgModule({
	declarations: [
		AlunoListComponent,
		AlunoComponent,
		ResponsavelComponent
	],
	exports: [],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		ReactiveFormsModule,
		NavModule,
		AtendimentoModule,
		DirectivesModule,
		AddButtonModule,
		DeleteConfirmationModule
	],
	providers: [AlunoService]
})
export class AlunoModule { }
