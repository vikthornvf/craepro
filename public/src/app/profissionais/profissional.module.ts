import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';
import { DirectivesModule } from '../shared/directives.module';
import { EnderecoModule } from '../endereco/endereco.module';
import { FormActionsModule } from '../form-actions/form-actions.module';
import { NavModule } from '../nav/nav.module';
import { PipesModule } from '../pipes/pipes.module';
import { TelefoneModule } from '../telefone/telefone.module';
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
		ReactiveFormsModule,
		BrowserModule,
		MaterializeSharedModule,
		AddButtonModule,
		AtendimentoModule,
		EnderecoModule,
		DirectivesModule,
		FormActionsModule,
		NavModule,
		PipesModule,
		TelefoneModule
	],
	providers: [ProfissionalService]
})
export class ProfissionalModule { }
