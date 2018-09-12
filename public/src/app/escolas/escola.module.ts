import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { DirectivesModule } from '../shared/directives.module';
import { EnderecoModule } from '../endereco/endereco.module';
import { FormActionsModule } from '../form-actions/form-actions.module';
import { NavModule } from '../nav/nav.module';
import { TelefoneModule } from '../telefone/telefone.module';
import { EscolaComponent } from './escola/escola.component';
import { EscolaListComponent } from './escola-list/escola-list.component';
import { EscolaService } from './escola.service';

@NgModule({
	declarations: [
		EscolaListComponent,
		EscolaComponent
	],
	exports: [],
	imports: [
		ReactiveFormsModule,
		CommonModule,
		MaterializeSharedModule,
		AddButtonModule,
		DirectivesModule,
		EnderecoModule,
		FormActionsModule,
		NavModule,
		TelefoneModule
	],
	providers: [EscolaService]
})
export class EscolaModule { }
