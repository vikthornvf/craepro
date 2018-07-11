import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { TelefoneModule } from '../telefone/telefone.module';
import { EnderecoModule } from '../endereco/endereco.module';
import { FormActionsModule } from '../form-actions/form-actions.module';
import { DirectivesModule } from '../shared/directives.module';
import { PipesModule } from '../pipes/pipes.module';

import { ProfissionalListComponent } from './profissional-list/profissional-list.component';
import { ProfissionalComponent } from './profissional/profissional.component';

import { ProfissionalService } from './profissional.service';

@NgModule({
	declarations: [
		ProfissionalListComponent,
		ProfissionalComponent
	],
	exports: [],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		ReactiveFormsModule,
		NavModule,
		AtendimentoModule,
		AddButtonModule,
		TelefoneModule,
		EnderecoModule,
		FormActionsModule,
		DirectivesModule,
		PipesModule
	],
	providers: [ProfissionalService]
})
export class ProfissionalModule { }
