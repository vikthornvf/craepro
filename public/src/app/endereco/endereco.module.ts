import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { EnderecoComponent } from './endereco.component';

@NgModule({
	declarations: [EnderecoComponent],
	imports: [
		MaterializeSharedModule,
		CommonModule,
		FormsModule
	],
	exports: [EnderecoComponent]
})
export class EnderecoModule {}
