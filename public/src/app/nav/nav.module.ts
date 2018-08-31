import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { AppRoutingModule } from '../app.routes';
import { NavComponent } from './nav.component';
import { HomebarComponent } from './navbar/homebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './navbar/searchbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './navbar/toolbar.component';
import { NavFilter } from './nav.pipe';
import { NavService } from './nav.service';

@NgModule({
	declarations: [
		NavComponent,
		HomebarComponent,
		NavbarComponent,
		SearchbarComponent,
		SidenavComponent,
		ToolbarComponent,
		NavFilter
	],
	imports: [
		BrowserModule,
		FormsModule,
		MaterializeSharedModule,
		AppRoutingModule
	],
	exports: [
		AppRoutingModule,
		NavComponent,
		HomebarComponent,
		NavbarComponent,
		SearchbarComponent,
		SidenavComponent,
		ToolbarComponent,
		NavFilter
	],
	providers: [
		NavService
	],
})
export class NavModule { }
