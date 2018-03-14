import { NgModule } from '@angular/core';
import { AtendimentoPipe } from './atendimento.pipe';
import { SeriePipe } from './serie.pipe';
import { StatusPipe } from './status.pipe';
import { TurnoPipe } from './turno.pipe';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { DiasSemanaPipe, DiasSemanaShortPipe } from './dias-semana.pipe';

@NgModule({
	declarations: [
		AtendimentoPipe,
		CapitalizeFirstPipe,
		DiasSemanaPipe,
		DiasSemanaShortPipe,
		SeriePipe,
		StatusPipe,
		TurnoPipe
	],
	exports: [
		AtendimentoPipe,
		CapitalizeFirstPipe,
		DiasSemanaPipe,
		DiasSemanaShortPipe,
		SeriePipe,
		StatusPipe,
		TurnoPipe
	],
})
export class PipesModule { }
