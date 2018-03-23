import { NgModule } from '@angular/core';
import { AtendimentoPipe } from './atendimento.pipe';
import { SeriePipe } from './serie.pipe';
import { SituacaoPipe } from './situacao.pipe';
import { TurnoPipe } from './turno.pipe';
import { DiasSemanaPipe, DiasSemanaShortPipe } from './dias-semana.pipe';

@NgModule({
	declarations: [
		AtendimentoPipe,
		DiasSemanaPipe,
		DiasSemanaShortPipe,
		SeriePipe,
		SituacaoPipe,
		TurnoPipe
	],
	exports: [
		AtendimentoPipe,
		DiasSemanaPipe,
		DiasSemanaShortPipe,
		SeriePipe,
		SituacaoPipe,
		TurnoPipe
	],
})
export class PipesModule { }
