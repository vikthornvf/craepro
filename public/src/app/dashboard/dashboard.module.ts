import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ConfirmarUsuariosComponent } from './confirmar-usuarios/confirmar-usuarios.component';
import { ProfissionalDashboardComponent } from './profissional-dashboard/profissional-dashboard.component';

@NgModule({
	declarations: [
		DashboardComponent,
		AdminDashboardComponent,
		ConfirmarUsuariosComponent,
		ProfissionalDashboardComponent
	],
	imports: [
		CommonModule,
		MaterializeSharedModule,
		PipesModule
	]
})
export class DashboardModule {}
