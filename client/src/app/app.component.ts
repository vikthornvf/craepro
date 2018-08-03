import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavService } from './nav/nav.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

	@ViewChild('headerEl') headerEl: ElementRef;
	@ViewChild('mainEl') mainEl: ElementRef;
	topbarSubscription: Subscription;
	sidebarSubscription: Subscription;

	constructor(private navService: NavService, private renderer: Renderer2) {}

	ngOnInit() {
		this.sidebarSubscription = this.navService.hideSidebar.subscribe(hide => {
			if (hide) {
				this.renderer.removeClass(this.headerEl.nativeElement, 'wrapper');
				this.renderer.removeClass(this.mainEl.nativeElement, 'wrapper');
			} else {
				this.renderer.addClass(this.headerEl.nativeElement, 'wrapper');
				this.renderer.addClass(this.mainEl.nativeElement, 'wrapper');
			}
		});
		this.topbarSubscription = this.navService.hideTopbar.subscribe(hide => {
			if (hide) {
				this.renderer.removeClass(this.mainEl.nativeElement, 'topMargin');
			} else {
				this.renderer.addClass(this.mainEl.nativeElement, 'topMargin');
			}
		});
	}

	ngOnDestroy() {
		this.sidebarSubscription.unsubscribe();
		this.topbarSubscription.unsubscribe();
	}
}
