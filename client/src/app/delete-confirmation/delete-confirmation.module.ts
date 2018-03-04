import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { NgModule } from '@angular/core';
import { DeleteConfirmationComponent } from './delete-confirmation.component';

@NgModule({
	declarations: [DeleteConfirmationComponent],
	imports: [MaterializeSharedModule],
	exports: [DeleteConfirmationComponent]
})
export class DeleteConfirmationModule {}
