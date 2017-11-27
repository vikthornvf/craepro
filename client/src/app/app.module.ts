import { MaterializeSharedModule } from './materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavModule } from './nav/nav.module';
import { AlunoModule } from './alunos/aluno.module';
import { ProfessorModule } from './professores/professor.module';
import { EscolaModule } from './escolas/escola.module';
import { UsuarioModule } from './usuarios/usuario.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		HttpModule,
		NavModule,
		AlunoModule,
		ProfessorModule,
		EscolaModule,
		UsuarioModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
