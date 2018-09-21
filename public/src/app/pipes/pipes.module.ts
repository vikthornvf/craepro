import { NgModule } from '@angular/core';

import { AtendimentoPipe } from './atendimento.pipe';
import { DiasSemanaPipe, DiasSemanaShortPipe } from './dias-semana.pipe';
import { SeriePipe } from './serie.pipe';
import { SituacaoPipe } from './situacao.pipe';
import { TipoAtendimentoPipe } from './tipoAtendimento.pipe';
import { TipoUsuarioPipe } from './tipoUsuario.pipe';
import { TurnoPipe } from './turno.pipe';

@NgModule({
	declarations: [
		AtendimentoPipe,
		DiasSemanaPipe,
		DiasSemanaShortPipe,
		SeriePipe,
		SituacaoPipe,
		TipoAtendimentoPipe,
		TipoUsuarioPipe,
		TurnoPipe
	],
	exports: [
		AtendimentoPipe,
		DiasSemanaPipe,
		DiasSemanaShortPipe,
		SeriePipe,
		SituacaoPipe,
		TipoAtendimentoPipe,
		TipoUsuarioPipe,
		TurnoPipe
	],
})
export class PipesModule { }
