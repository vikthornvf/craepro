import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TelefoneModule } from '../telefone/telefone.module';
import { EnderecoModule } from '../endereco/endereco.module';
import { ResponsavelComponent } from './responsavel/responsavel.component';
import { ResponsavelService } from './responsavel.service';
import { DirectivesModule } from '../shared/directives.module';

@NgModule({
	declarations: [ResponsavelComponent],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		ReactiveFormsModule,
		DirectivesModule,
		TelefoneModule,
		EnderecoModule
	],
	exports: [ResponsavelComponent],
	providers: [ResponsavelService]
})
export class ResponsavelModule {}
