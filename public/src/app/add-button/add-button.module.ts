import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddButtonComponent } from './add-button.component';

@NgModule({
	declarations: [AddButtonComponent],
	exports: [AddButtonComponent],
	imports: [
		CommonModule,
		RouterModule
	]
})
export class AddButtonModule {}
