import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	show = true;

	constructor(router: Router) {
		// gambi
		router.events.subscribe(e => {
			if (e instanceof NavigationEnd) {
				if (e.url.includes('login')) {
					this.show = false;
				} else {
					this.show = true;
				}
			}
		});
	}
}
