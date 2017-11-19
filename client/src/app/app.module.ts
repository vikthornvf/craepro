import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavModule } from './nav/nav.module';
import { AlunoModule } from './alunos/aluno.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		MaterializeModule,
		BrowserModule,
		RouterModule,
		NavModule,
		AlunoModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
