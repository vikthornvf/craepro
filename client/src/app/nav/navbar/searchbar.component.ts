import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../nav.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit, OnDestroy {

	keyword = '';
	keywordSubscription: Subscription;

	constructor(private navService: NavService) {}

	ngOnInit() {
		this.keywordSubscription = this.navService.keyword.subscribe(keyword => this.keyword = keyword);
	}

	ngOnDestroy() {
		this.keywordSubscription.unsubscribe();
	}

	onKeyup() {
		this.navService.changeKeyword(this.keyword);
	}

	onCleanKeyword() {
		this.keyword = '';
		this.onKeyup();
	}
}
