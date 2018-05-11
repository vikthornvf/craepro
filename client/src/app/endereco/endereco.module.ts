import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnderecoComponent } from './endereco.component';

@NgModule({
	declarations: [EnderecoComponent],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		FormsModule
	],
	exports: [EnderecoComponent]
})
export class EnderecoModule {}
