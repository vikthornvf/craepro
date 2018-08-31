import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterializeSharedModule } from '../shared/materialize-shared.module';
import { DialogsComponent } from './dialogs.component';
import { DialogsService } from './dialogs.service';

@NgModule({
	declarations: [DialogsComponent],
	imports: [
		MaterializeSharedModule,
		CommonModule
	],
	exports: [DialogsComponent],
	providers: [DialogsService]
})
export class DialogsModule {}
