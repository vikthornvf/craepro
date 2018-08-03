import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavService {

	readonly state = {
		NAVBAR: 'navbar',
		SEARCHBAR: 'searchbar',
		TOOLBAR: 'toolbar'
	};

	readonly tools = {
		SELECTION: 0,
		EDIT: 1,
		EDIT_ATT: 2,
		DELETE_ATT: 3
	};

	private keyword$ = new BehaviorSubject<string>('');
	keyword = this.keyword$.asObservable();

	private barState$ = new BehaviorSubject<string>(this.state.NAVBAR);
	barState = this.barState$.asObservable();

	private hideSidebar$ = new BehaviorSubject<boolean>(false);
	hideSidebar = this.hideSidebar$.asObservable();

	hideTopbar$ = new BehaviorSubject<boolean>(false);
	hideTopbar = this.hideTopbar$.asObservable();

	// control the toolbar functions
	toolbar = new Subject<number>();
	hasAtt = new Subject<boolean>();
	private link$ = new BehaviorSubject<string[]>([]);

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

	linkObservable(): Observable<string[]> {
		return this.link$.asObservable();
	}

	onHideSidebar(hide: boolean) {
		if (this.hideSidebar$.getValue() !== hide) {
			this.hideSidebar$.next(hide);
		}
	}

	onHideTopbar(hide: boolean) {
		if (this.hideTopbar$.getValue() !== hide) {
			this.hideTopbar$.next(hide);
		}
	}
}
