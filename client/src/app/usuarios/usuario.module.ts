import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { FormActionsModule } from '../form-actions/form-actions.module';
import { DirectivesModule } from '../shared/directives.module';

import { UsuarioRegistroComponent } from './usuario-registro/usuario-registro.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioLoginPaneComponent } from './usuario-login-pane/usuario-login-pane.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioPasswordComponent } from './usuario-password/usuario-password.component';
import { UsuarioProfileComponent } from './usuario-profile/usuario-profile.component';

import { UsuarioService } from './usuario.service';

@NgModule({
	declarations: [
		UsuarioRegistroComponent,
		UsuarioLoginComponent,
		UsuarioLoginPaneComponent,
		UsuarioListComponent,
		UsuarioComponent,
		UsuarioPasswordComponent,
		UsuarioProfileComponent
	],
	exports: [],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		ReactiveFormsModule,
		NavModule,
		AddButtonModule,
		FormActionsModule,
		DirectivesModule
	],
	providers: [
		UsuarioService
	]
})
export class UsuarioModule { }
