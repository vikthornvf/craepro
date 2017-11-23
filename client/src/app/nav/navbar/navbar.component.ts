import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Location } from '@angular/common';
import { NavbarService } from './navbar.service';

declare var $: any;

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentChecked {

	navbarSearch = false;

	constructor(private navProps: NavbarService, private _location: Location) { }

	ngOnInit() {
		this.navProps.navbarSearch.subscribe(navbarSearch => this.navbarSearch = navbarSearch);
	}

	ngAfterContentChecked() {
		$('.dropdown-button').dropdown();
	}

	onBack() {
		this._location.back();
	}
}
