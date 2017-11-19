import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
	declarations: [
		NavbarComponent,
		SidenavComponent
	],
	imports: [
		MaterializeModule,
		BrowserModule,
		FormsModule
	],
	exports: [
		NavbarComponent,
		SidenavComponent
	],
	providers: [],
})
export class NavModule { }
