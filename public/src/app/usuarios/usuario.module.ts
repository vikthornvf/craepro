import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { FormActionsModule } from '../form-actions/form-actions.module';
import { NavModule } from '../nav/nav.module';
import { DirectivesModule } from '../shared/directives.module';

import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioLoginPaneComponent } from './usuario-login-pane/usuario-login-pane.component';
import { UsuarioPasswordComponent } from './usuario-password/usuario-password.component';
import { UsuarioProfileComponent } from './usuario-profile/usuario-profile.component';
import { UsuarioRegistroComponent } from './usuario-registro/usuario-registro.component';

import { UsuarioService } from './usuario.service';

@NgModule({
	declarations: [
		UsuarioComponent,
		UsuarioListComponent,
		UsuarioLoginComponent,
		UsuarioLoginPaneComponent,
		UsuarioPasswordComponent,
		UsuarioProfileComponent,
		UsuarioRegistroComponent
	],
	exports: [],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterializeSharedModule,
		AddButtonModule,
		FormActionsModule,
		NavModule,
		DirectivesModule
	],
	providers: [
		UsuarioService
	]
})
export class UsuarioModule { }
