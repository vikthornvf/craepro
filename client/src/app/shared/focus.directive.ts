import { Directive, OnChanges, Input, ElementRef, Inject } from '@angular/core';
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
