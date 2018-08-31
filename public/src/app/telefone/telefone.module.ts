import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { TelefoneComponent } from './telefone.component';

@NgModule({
	declarations: [TelefoneComponent],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		FormsModule
	],
	exports: [TelefoneComponent]
})
export class TelefoneModule {}
