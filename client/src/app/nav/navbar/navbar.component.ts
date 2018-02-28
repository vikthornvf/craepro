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

	state: string = this.navProps.state.NAVBAR;

	constructor(private navProps: NavbarService, private _location: Location) { }

	ngOnInit() {
		this.navProps.barState.subscribe(barState => this.state = barState);
	}

	ngAfterContentChecked() {
		$('.dropdown-button').dropdown();
	}

	onBack() {
		this._location.back();
	}
}
