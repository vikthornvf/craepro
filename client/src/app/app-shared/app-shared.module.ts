import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingEditButtonComponent } from './floating-edit-button.component';

@NgModule({
	declarations: [FloatingEditButtonComponent],
	exports: [FloatingEditButtonComponent],
	imports: [
		CommonModule,
		RouterModule
	]
})
export class AppSharedModule { }
