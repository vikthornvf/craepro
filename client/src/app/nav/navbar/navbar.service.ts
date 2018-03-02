import { Injectable } from '@angular/core';
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

	private toolbar$ = new BehaviorSubject<number>(-1);
	toolbar = this.toolbar$.asObservable();

	private hasAtt$ = new BehaviorSubject<boolean>(false);
	hasAtt = this.hasAtt$.asObservable();

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

	emitTool(tool: number) {
		this.toolbar$.next(tool);
	}

	changeHasAtt(hasAtt: boolean) {
		this.hasAtt$.next(hasAtt);
	}

	changeLink(link: string[]) {
		this.link$.next(link);
	}
}
