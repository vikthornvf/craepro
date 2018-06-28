import { MaterializeSharedModule } from './shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NavModule } from './nav/nav.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { NotFoundModule } from './not-found/not-found.module';
import { AlunoModule } from './alunos/aluno.module';
import { ProfessorModule } from './professores/professor.module';
import { EscolaModule } from './escolas/escola.module';
import { UsuarioModule } from './usuarios/usuario.module';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { LoginGuardService } from './login-guard.service';
import { StorageService } from './storage.service';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		HttpClientModule,
		NavModule,
		DialogsModule,
		NotFoundModule,
		AlunoModule,
		ProfessorModule,
		EscolaModule,
		UsuarioModule
	],
	providers: [
		AuthService,
		AuthGuardService,
		LoginGuardService,
		StorageService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
