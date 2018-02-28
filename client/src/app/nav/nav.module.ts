import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app.routes';

import { NavComponent } from './nav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './navbar/searchbar.component';
import { ToolbarComponent } from './navbar/toolbar.component';
import { NavFilter } from './nav.pipe';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarService } from './navbar/navbar.service';

@NgModule({
	declarations: [
		NavComponent,
		NavbarComponent,
		SearchbarComponent,
		ToolbarComponent,
		NavFilter,
		SidenavComponent
	],
	imports: [
		MaterializeModule,
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	exports: [
		AppRoutingModule,
		NavComponent,
		NavbarComponent,
		SearchbarComponent,
		ToolbarComponent,
		NavFilter,
		SidenavComponent
	],
	providers: [
		NavbarService
	],
})
export class NavModule { }
