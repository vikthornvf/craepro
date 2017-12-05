import { MaterializeSharedModule } from '../materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavModule } from '../nav/nav.module';
import { AppSharedModule } from '../app-shared/app-shared.module';

import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioSenhaComponent } from './usuario/usuario-senha.component';

@NgModule({
	declarations: [
		UsuarioListComponent,
		UsuarioComponent,
		UsuarioSenhaComponent
	],
	exports: [
		UsuarioListComponent,
		UsuarioComponent,
		UsuarioSenhaComponent
	],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		NavModule,
		AppSharedModule
	],
	providers: []
})
export class UsuarioModule { }
