import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';
import { FloatingAddButtonModule } from '../shared/floating-add-button.module';

import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoComponent } from './aluno/aluno.component';
import { FloatingAddButtonComponent } from '../shared/floating-add-button.component';

import { DirectivesModule } from '../shared/directives.module';
import { AlunoService } from './aluno.service';

@NgModule({
	declarations: [
		AlunoListComponent,
		AlunoComponent
	],
	exports: [
		AlunoListComponent,
		AlunoComponent
	],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		FormsModule,
		NavModule,
		AtendimentoModule,
		DirectivesModule,
		FloatingAddButtonModule
	],
	providers: [AlunoService]
})
export class AlunoModule { }
