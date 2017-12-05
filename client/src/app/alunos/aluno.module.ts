import { MaterializeSharedModule } from '../materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AtendimentoModule } from '../atendimentos/atendimento.module';
import { AppSharedModule } from '../app-shared/app-shared.module';

import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoComponent } from './aluno/aluno.component';

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
		AppSharedModule
	],
	providers: [AlunoService]
})
export class AlunoModule { }
