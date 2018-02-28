import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

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
