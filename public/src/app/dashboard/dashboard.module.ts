import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { AlunoModule } from '../alunos/aluno.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AlunosEmEsperaComponent } from './alunos-em-espera/alunos-em-espera.component';
import { ConfirmarUsuariosComponent } from './confirmar-usuarios/confirmar-usuarios.component';
import { ProfissionalDashboardComponent } from './profissional-dashboard/profissional-dashboard.component';

@NgModule({
	declarations: [
		DashboardComponent,
		AdminDashboardComponent,
		AlunosEmEsperaComponent,
		ConfirmarUsuariosComponent,
		ProfissionalDashboardComponent
	],
	imports: [
		CommonModule,
		MaterializeSharedModule,
		PipesModule,
		AlunoModule
	]
})
export class DashboardModule {}
