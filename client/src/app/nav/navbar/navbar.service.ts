import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavbarService {

	private keywordSource  = new BehaviorSubject<string>('');
	keyword = this.keywordSource.asObservable();

	private navbarSearchSource = new BehaviorSubject<boolean>(false);
	navbarSearch = this.navbarSearchSource.asObservable();

	changeKeyword(keyword: string) {
		this.keywordSource.next(keyword);
	}

	changeNavbarSearch(navbarSearch: boolean) {
		this.navbarSearchSource.next(navbarSearch);
	}
}
