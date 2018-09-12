import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../shared/directives.module';
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
		AtendimentoListComponent,
		AtendimentoComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterializeSharedModule,
		DirectivesModule,
		PipesModule
	],
	providers: [AtendimentoService]
})
export class AtendimentoModule { }
