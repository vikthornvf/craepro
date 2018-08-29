import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { AppRoutingModule } from '../app.routes';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		MaterializeSharedModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserModule
	],
	exports: [],
	providers: [HomeService]
})
export class HomeModule {}
