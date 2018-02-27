import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloatingAddButtonComponent } from './floating-add-button.component';

@NgModule({
	declarations: [FloatingAddButtonComponent],
	exports: [FloatingAddButtonComponent],
	imports: [
		CommonModule,
		RouterModule
	]
})
export class FloatingAddButtonModule { }
