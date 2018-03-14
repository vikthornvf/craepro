import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';
import { PipesModule } from '../pipes/pipes.module';

import { AtendimentoListComponent } from './atendimento-list/atendimento-list.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoModalComponent } from './atendimento-modal/atendimento-modal.component';

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
		MaterializeSharedModule,
		DeleteConfirmationModule,
		PipesModule
	],
	providers: [AtendimentoService]
})
export class AtendimentoModule { }
