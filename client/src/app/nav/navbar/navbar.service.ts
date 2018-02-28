import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { deprecate } from 'util';

@Injectable()
export class NavbarService {

	readonly state = {
		NAVBAR: 'navbar',
		SEARCHBAR: 'searchbar',
		TOOLBAR: 'toolbar'
	};

	private keywordSource  = new BehaviorSubject<string>('');
	keyword = this.keywordSource.asObservable();

	private barStateSource = new BehaviorSubject<string>(this.state.NAVBAR);
	barState = this.barStateSource.asObservable();

	changeKeyword(keyword: string) {
		this.keywordSource.next(keyword);
	}

	changeState(state: string) {
		this.barStateSource.next(state);
	}
}
