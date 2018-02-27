import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { FloatingAddButtonModule } from '../shared/floating-add-button.module';

import { EscolaListComponent } from './escola-list/escola-list.component';

import { EscolaService } from './escola.service';

@NgModule({
	declarations: [
		EscolaListComponent
	],
	exports: [EscolaListComponent],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		NavModule,
		FloatingAddButtonModule
	],
	providers: [EscolaService]
})
export class EscolaModule { }
