import { MaterializeSharedModule } from './shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NavModule } from './nav/nav.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { NotFoundModule } from './not-found/not-found.module';
import { HomeModule } from './home/home.module';
// import { DashboardModule } from './dashboard/dashboard.module';
import { AlunoModule } from './alunos/aluno.module';
import { ProfissionalModule } from './profissionais/profissional.module';
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
		HomeModule,
		// DashboardModule,
		AlunoModule,
		ProfissionalModule,
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
