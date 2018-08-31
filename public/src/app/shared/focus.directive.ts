import { Directive, ElementRef, Inject, Input, OnChanges } from '@angular/core';

@Directive({
	selector: '[focus]'
})
export class FocusDirective implements OnChanges {

	@Input() focus = true;

	constructor(@Inject(ElementRef) private element: ElementRef) {}

	ngOnChanges() {
		if (this.focus) {
			this.element.nativeElement.focus();
		}
	}
}
