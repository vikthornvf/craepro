import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
