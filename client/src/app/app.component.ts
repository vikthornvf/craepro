import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	show = true;

	constructor(private router: Router) {}

	ngOnInit() {
		// FIXME
		this.router.events.subscribe(e => {
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
