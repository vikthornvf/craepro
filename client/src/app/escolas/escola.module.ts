import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';

import { EscolaListComponent } from './escola-list/escola-list.component';

@NgModule({
	declarations: [
		EscolaListComponent
	],
	exports: [EscolaListComponent],
	imports: [
		BrowserModule,
		NavModule
	],
	providers: []
})
export class EscolaModule { }
