import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavService } from './nav.service';

@Component({
	selector: 'app-nav',
	template: `
		<app-sidenav *ngIf="showSidebar"></app-sidenav>
		<app-navbar *ngIf="showTopbar"></app-navbar>
	`
})
export class NavComponent implements OnInit, OnDestroy {

	hideSidebarSubscription: Subscription;
	hideTopbarSubscription: Subscription;
	showSidebar: boolean;
	showTopbar: boolean;

	constructor(private service: NavService) {}

	ngOnInit(): void {
		this.hideSidebarSubscription = this.service.hideSidebar.subscribe(hide => this.showSidebar = !hide);
		this.hideTopbarSubscription = this.service.hideTopbar.subscribe(hide => this.showTopbar = !hide);
	}

	ngOnDestroy(): void {
		this.hideSidebarSubscription.unsubscribe();
		this.hideTopbarSubscription.unsubscribe();
	}
}
