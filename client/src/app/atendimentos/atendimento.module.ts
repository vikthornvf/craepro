import { MaterializeSharedModule } from '../materialize-shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AtendimentoItemComponent } from './atendimento-item/atendimento-item.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoModalComponent } from './atendimento-modal/atendimento-modal.component';

@NgModule({
	declarations: [
		AtendimentoModalComponent,
		AtendimentoItemComponent,
		AtendimentoComponent
	],
	exports: [
		AtendimentoModalComponent,
		AtendimentoItemComponent,
		AtendimentoComponent
	],
	imports: [
		BrowserModule,
		MaterializeSharedModule],
	providers: [AtendimentoService]
})
export class AtendimentoModule { }
