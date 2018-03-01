import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

	keyword = '';

	constructor(private navService: NavbarService) {}

	ngOnInit() {
		this.navService.keyword.subscribe(keyword => this.keyword = keyword);
	}

	onKeyup() {
		this.navService.changeKeyword(this.keyword);
	}

	onCleanKeyword() {
		this.keyword = '';
		this.onKeyup();
	}
}
