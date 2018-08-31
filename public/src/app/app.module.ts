import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { MaterializeSharedModule } from './shared/materialize-shared.module';
import { AlunoModule } from './alunos/aluno.module';
// import { DashboardModule } from './dashboard/dashboard.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { EscolaModule } from './escolas/escola.module';
import { HomeModule } from './home/home.module';
import { NavModule } from './nav/nav.module';
import { NotFoundModule } from './not-found/not-found.module';
import { ProfissionalModule } from './profissionais/profissional.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { StorageService } from './storage.service';
import { LoginGuardService } from './login-guard.service';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		HttpClientModule,
		BrowserModule,
		MaterializeSharedModule,
		AlunoModule,
		// DashboardModule,
		DialogsModule,
		EscolaModule,
		HomeModule,
		NavModule,
		NotFoundModule,
		ProfissionalModule,
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
