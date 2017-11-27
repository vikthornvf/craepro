import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';

import { EscolaListComponent } from './escola-list/escola-list.component';

import { EscolaService } from './escola.service';

@NgModule({
	declarations: [
		EscolaListComponent
	],
	exports: [EscolaListComponent],
	imports: [
		BrowserModule,
		NavModule
	],
	providers: [EscolaService]
})
export class EscolaModule { }
