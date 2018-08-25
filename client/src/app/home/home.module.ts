import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app.routes';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		MaterializeSharedModule,
		BrowserModule,
		ReactiveFormsModule,
		AppRoutingModule],
	exports: [HomeComponent],
	providers: [HomeService]
})
export class HomeModule {}
