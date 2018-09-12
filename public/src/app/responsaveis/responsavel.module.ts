import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { EnderecoModule } from '../endereco/endereco.module';
import { DirectivesModule } from '../shared/directives.module';
import { TelefoneModule } from '../telefone/telefone.module';
import { ResponsavelComponent } from './responsavel/responsavel.component';
import { ResponsavelService } from './responsavel.service';

@NgModule({
	declarations: [ResponsavelComponent],
	imports: [
		ReactiveFormsModule,
		CommonModule,
		MaterializeSharedModule,
		EnderecoModule,
		DirectivesModule,
		TelefoneModule
	],
	exports: [ResponsavelComponent],
	providers: [ResponsavelService]
})
export class ResponsavelModule {}
