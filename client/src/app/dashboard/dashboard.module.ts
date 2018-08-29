import { NgModule } from '@angular/core';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
	declarations: [DashboardComponent],
	imports: [MaterializeSharedModule],
	exports: []
})
export class DashboardModule {}
