import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { DirectivesModule } from '../shared/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { AtendimentoListComponent } from './atendimento-list/atendimento-list.component';
import { AtendimentoModalComponent } from './atendimento-modal/atendimento-modal.component';
import { AtendimentoService } from './atendimento.service';

@NgModule({
	declarations: [
		AtendimentoModalComponent,
		AtendimentoListComponent,
		AtendimentoComponent
	],
	exports: [
		AtendimentoModalComponent,
		AtendimentoListComponent,
		AtendimentoComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		MaterializeSharedModule,
		DirectivesModule,
		PipesModule
	],
	providers: [AtendimentoService]
})
export class AtendimentoModule { }
