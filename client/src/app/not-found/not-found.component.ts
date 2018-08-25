import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../nav/nav.service';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit, OnDestroy {

	constructor(private navService: NavService) {}

	ngOnInit() {
		this.navService.onHideSidebar(true);
	}

	ngOnDestroy() {
		this.navService.onHideSidebar(false);
	}
}
