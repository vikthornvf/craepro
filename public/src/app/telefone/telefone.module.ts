import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { TelefoneComponent } from './telefone.component';

@NgModule({
	declarations: [TelefoneComponent],
	imports: [
		MaterializeSharedModule,
		CommonModule,
		FormsModule
	],
	exports: [TelefoneComponent]
})
export class TelefoneModule {}
