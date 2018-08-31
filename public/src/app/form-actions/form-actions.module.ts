import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormActionsComponent } from './form-actions.component';

@NgModule({
	declarations: [FormActionsComponent],
	exports: [FormActionsComponent],
	imports: [
		CommonModule,
		RouterModule
	]
})
export class FormActionsModule {}
