import { Component, OnInit, Input } from '@angular/core';

declare var $;

@Component({
	selector: 'app-homebar',
	templateUrl: './homebar.component.html',
	styleUrls: ['./homebar.component.css']
})
export class HomebarComponent implements OnInit {

	@Input() logged: boolean;

	ngOnInit(): void {
		this.initDropdown();
	}

	initDropdown() {
		$(document).ready(function() {
			$('.dropdown-button').dropdown();
		});
	}
}
