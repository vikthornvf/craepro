import { Component, OnDestroy, OnInit } from '@angular/core';

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
