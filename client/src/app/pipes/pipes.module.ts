import { NgModule } from '@angular/core';
import { AtendimentoPipe } from './atendimento.pipe';
import { SeriePipe } from './serie.pipe';
import { StatusPipe } from './status.pipe';
import { TurnoPipe } from './turno.pipe';

@NgModule({
	declarations: [
		AtendimentoPipe,
		SeriePipe,
		StatusPipe,
		TurnoPipe
	],
	exports: [
		AtendimentoPipe,
		SeriePipe,
		StatusPipe,
		TurnoPipe
	],
})
export class PipesModule { }
