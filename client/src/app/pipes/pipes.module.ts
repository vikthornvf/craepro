import { NgModule } from '@angular/core';

import { AtendimentoPipe } from './atendimento.pipe';
import { DiasSemanaPipe, DiasSemanaShortPipe } from './dias-semana.pipe';
import { SeriePipe } from './serie.pipe';
import { SituacaoPipe } from './situacao.pipe';
import { TipoAtendimentoPipe } from './tipoAtendimento.pipe';
import { TurnoPipe } from './turno.pipe';

@NgModule({
	declarations: [
		AtendimentoPipe,
		DiasSemanaPipe,
		DiasSemanaShortPipe,
		SeriePipe,
		SituacaoPipe,
		TipoAtendimentoPipe,
		TurnoPipe
	],
	exports: [
		AtendimentoPipe,
		DiasSemanaPipe,
		DiasSemanaShortPipe,
		SeriePipe,
		SituacaoPipe,
		TipoAtendimentoPipe,
		TurnoPipe
	],
})
export class PipesModule { }
