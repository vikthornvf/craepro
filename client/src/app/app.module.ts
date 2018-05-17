import { MaterializeSharedModule } from './shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavModule } from './nav/nav.module';
import { DialogsModule } from './dialogs/dialogs.module';
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
		HttpClientModule,
		NavModule,
		DialogsModule,
		AlunoModule,
		ProfessorModule,
		EscolaModule,
		UsuarioModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
