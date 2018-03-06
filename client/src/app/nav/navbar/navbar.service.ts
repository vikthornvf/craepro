import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavbarService {

	readonly state = {
		NAVBAR: 'navbar',
		SEARCHBAR: 'searchbar',
		TOOLBAR: 'toolbar'
	};

	readonly tools = {
		SELECTION: 0,
		EDIT: 1,
		DELETE: 2,
		ADD_ATT: 3,
		EDIT_ATT: 4,
		DELETE_ATT: 5
	};

	private keyword$ = new BehaviorSubject<string>('');
	keyword = this.keyword$.asObservable();

	private barState$ = new BehaviorSubject<string>(this.state.NAVBAR);
	barState = this.barState$.asObservable();

	// control the toolbar functions
	toolbar = new EventEmitter<number>();
	hasAtt = new EventEmitter<boolean>();

	private link$ = new BehaviorSubject<string[]>([]);
	link = this.link$.asObservable();

	constructor(private _location: Location) {}

	path(): string {
		return this._location.path();
	}

	onNavigateBack(): void {
		this._location.back();
	}

	changeKeyword(keyword: string) {
		this.keyword$.next(keyword);
	}

	changeState(state: string) {
		this.barState$.next(state);
	}

	changeLink(link: string[]) {
		this.link$.next(link);
	}
}
