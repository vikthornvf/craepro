import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
	selector: 'app-navbar-search',
	templateUrl: './navbar-search.component.html',
	styleUrls: ['./navbar-search.component.css']
})
export class NavbarSearchComponent implements OnInit {

	keyword = '';

	constructor(private navProps: NavbarService) { }

	ngOnInit() {
		this.navProps.keyword.subscribe(keyword => this.keyword = keyword);
	}

	onKeyup() {
		this.navProps.changeKeyword(this.keyword);
	}

	onCleanKeyword() {
		this.keyword = '';
		this.onKeyup();
	}
}
