import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';

import { AtendimentoListComponent } from './atendimento-list/atendimento-list.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoModalComponent } from './atendimento-modal/atendimento-modal.component';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';

@NgModule({
	declarations: [
		AtendimentoModalComponent,
		AtendimentoListComponent,
		AtendimentoComponent,
		CapitalizeFirstPipe
	],
	exports: [
		AtendimentoModalComponent,
		AtendimentoListComponent,
		AtendimentoComponent
	],
	imports: [
		BrowserModule,
		MaterializeSharedModule,
		DeleteConfirmationModule],
	providers: [AtendimentoService]
})
export class AtendimentoModule { }
