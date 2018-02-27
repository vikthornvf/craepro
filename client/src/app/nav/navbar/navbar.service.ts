import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { deprecate } from 'util';

@Injectable()
export class NavbarService {

	state = {
		NAVBAR: 0,
		SEARCHBAR: 1,
		TOOLBAR: 2
	};

	private keywordSource  = new BehaviorSubject<string>('');
	keyword = this.keywordSource.asObservable();

	private navbarStateSource = new BehaviorSubject<number>(this.state.NAVBAR);
	navbarState = this.navbarStateSource.asObservable();

	/*
	 * @deprecated
	 */
	private navbarSearchSource = new BehaviorSubject<boolean>(false);
	navbarSearch = this.navbarSearchSource.asObservable();
	changeNavbarSearch(navbarSearch: boolean) {
		this.navbarSearchSource.next(navbarSearch);
	}

	changeKeyword(keyword: string) {
		this.keywordSource.next(keyword);
	}

	changeState(state: number) {
		this.navbarStateSource.next(state);
	}
}
