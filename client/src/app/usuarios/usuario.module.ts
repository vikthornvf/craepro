import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { DirectivesModule } from '../shared/directives.module';
import { AddButtonModule } from '../add-button/add-button.module';

import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioPasswordComponent } from './usuario-password/usuario-password.component';
import { UsuarioProfileComponent } from './usuario-profile/usuario-profile.component';
import { UsuarioService } from './usuario.service';

@NgModule({
	declarations: [
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
		DirectivesModule,
		AddButtonModule,
	],
	providers: [
		UsuarioService
	]
})
export class UsuarioModule { }
