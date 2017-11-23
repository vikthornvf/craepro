import { MaterializeSharedModule } from '../materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';

import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoComponent } from './aluno/aluno.component';

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
		NavModule,
		AtendimentoModule
	],
	providers: []
})
export class AlunoModule { }
