import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../nav.service';

@Component({
	selector: 'app-homebar',
	templateUrl: './homebar.component.html',
	styleUrls: ['./homebar.component.css']
})
export class HomebarComponent implements OnInit, OnDestroy {

	constructor(private navService: NavService) {}

	ngOnInit() {
	}

	ngOnDestroy() {
	}
}
