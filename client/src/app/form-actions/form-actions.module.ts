import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormActionsComponent } from './form-actions.component';

@NgModule({
	declarations: [FormActionsComponent],
	exports: [FormActionsComponent],
	imports: [
		CommonModule,
		RouterModule
	]
})
export class AddButtonModule {}
