import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AddButtonModule } from '../add-button/add-button.module';

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
		NavModule,
		AddButtonModule,
	],
	providers: [EscolaService]
})
export class EscolaModule { }
