import { MaterializeSharedModule } from '../materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AppSharedModule } from '../app-shared/app-shared.module';

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
		AppSharedModule
	],
	providers: [EscolaService]
})
export class EscolaModule { }
