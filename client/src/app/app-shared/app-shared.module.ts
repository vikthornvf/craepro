import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloatingEditButtonComponent } from './floating-edit-button.component';
import { FocusDirective } from './focus.directive';

@NgModule({
	declarations: [
		FocusDirective,
		FloatingEditButtonComponent
	],
	exports: [
		FocusDirective,
		FloatingEditButtonComponent
	],
	imports: [
		CommonModule,
		RouterModule
	]
})
export class AppSharedModule { }
