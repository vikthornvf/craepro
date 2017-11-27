import { MaterializeSharedModule } from '../materialize-shared.module';
import { MaterializeDirective } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InputComponent } from './input.component';
import { SelectComponent } from './select.component';

@NgModule({
	declarations: [
		InputComponent,
		SelectComponent
	],
	exports: [
		InputComponent,
		SelectComponent
	],
	imports: [
		MaterializeSharedModule,
		BrowserModule
	],
})
export class MaterializeFormsModule { }
