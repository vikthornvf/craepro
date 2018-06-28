import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';

@NgModule({
	declarations: [NotFoundComponent],
	imports: [MaterializeSharedModule],
	exports: [NotFoundComponent]
})
export class NotFoundModule {}
