import { MaterializeModule } from 'angular2-materialize';
import { NgModule } from '@angular/core';

@NgModule({
	exports: [MaterializeModule],
	imports: [MaterializeModule],
})
export class MaterializeSharedModule { }
