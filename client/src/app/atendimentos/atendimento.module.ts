import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { DeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';
import { DirectivesModule } from '../shared/directives.module';
import { PipesModule } from '../pipes/pipes.module';

import { AtendimentoModalComponent } from './atendimento-modal/atendimento-modal.component';
import { AtendimentoListComponent } from './atendimento-list/atendimento-list.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';

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
		DeleteConfirmationModule,
		DirectivesModule,
		PipesModule
	],
	providers: [AtendimentoService]
})
export class AtendimentoModule { }
