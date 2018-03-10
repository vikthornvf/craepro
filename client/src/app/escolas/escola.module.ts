import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { DeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';

import { EscolaListComponent } from './escola-list/escola-list.component';

import { EscolaService } from './escola.service';

@NgModule({
	declarations: [
		EscolaListComponent
	],
	exports: [],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		NavModule,
		AddButtonModule,
		DeleteConfirmationModule
	],
	providers: [EscolaService]
})
export class EscolaModule { }
