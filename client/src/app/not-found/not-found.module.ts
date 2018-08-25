import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app.routes';
import { NotFoundComponent } from './not-found.component';

@NgModule({
	declarations: [NotFoundComponent],
	imports: [MaterializeSharedModule, AppRoutingModule],
	exports: [NotFoundComponent]
})
export class NotFoundModule {}
