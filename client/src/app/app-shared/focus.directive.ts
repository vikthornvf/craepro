import { Directive, OnChanges, Input, ElementRef, Inject } from '@angular/core';
@Directive({
	selector: '[focus]'
})
export class FocusDirective implements OnChanges {

	@Input() focus: boolean;

	constructor(@Inject(ElementRef) private element: ElementRef) { }

	ngOnChanges() {
			this.element.nativeElement.focus();
	}
}
