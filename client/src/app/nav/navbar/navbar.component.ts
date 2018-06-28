import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';

declare var $: any;

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

	state: string = this.navService.state.NAVBAR;
	stateObservable: Subscription;

	constructor(
		private navService: NavbarService,
		private auth: AuthService) {}

	ngOnInit() {
		this.stateObservable = this.navService.barState.subscribe(barState => this.state = barState);
		$('.dropdown-button').dropdown();
	}

	ngOnDestroy() {
		this.stateObservable.unsubscribe();
	}

	onBack() {
		this.navService.onNavigateBack();
	}

	onLogout() {
		this.auth.logout();
	}
}
