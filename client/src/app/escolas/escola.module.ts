import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { TelefoneModule } from '../telefone/telefone.module';
import { EnderecoModule } from '../endereco/endereco.module';

import { EscolaListComponent } from './escola-list/escola-list.component';
import { EscolaComponent } from './escola/escola.component';

import { EscolaService } from './escola.service';

@NgModule({
	declarations: [
		EscolaListComponent,
		EscolaComponent
	],
	exports: [],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		ReactiveFormsModule,
		NavModule,
		AddButtonModule,
		TelefoneModule,
		EnderecoModule
	],
	providers: [EscolaService]
})
export class EscolaModule { }
