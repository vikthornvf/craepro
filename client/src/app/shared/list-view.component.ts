import { Component, OnInit, OnDestroy, Injectable, NgZone } from '@angular/core';
import { NavbarService } from '../nav/navbar/navbar.service';
import { Subscription } from 'rxjs/Subscription';

declare var $;

@Injectable()
export abstract class ListViewComponent implements OnInit, OnDestroy {

	keyword: string;
	keywordObservable: Subscription;

	selectedId: string;
	selected = false;

	currentElementId;

	params = [
		{
			onOpen: (el) => {
				this.currentElementId = el[0].firstElementChild.firstElementChild;
				this.zone.run(() => this.onOpen());
			},
			onClose: (el) => {
				let elementId;
				try {
					elementId = el[0].firstElementChild.firstElementChild;
				} catch (err) {}
				if (this.currentElementId === elementId) {
					this.zone.run(() => this.onClose());
				}
			}
		}
	];

	constructor(
		private zone: NgZone,
		private navProps: NavbarService) {}

	abstract loadList(): void;
	abstract getLink(): string;

	ngOnInit(): void {
		this.loadList();
		this.keywordObservable = this.navProps.keyword.subscribe(keyword => this.keyword = keyword);
		this.navProps.changeState(this.navProps.state.SEARCHBAR);
	}

	ngOnDestroy(): void {
		this.navProps.changeState(this.navProps.state.NAVBAR);
		this.keywordObservable.unsubscribe();
	}

	onSimpleSelect(id: string) {
		if (this.selectedId === id) {
			this.selectedId = null;
			this.onClose();
		} else {
			this.selectedId = id;
			this.onOpen();
		}
	}

	onSelect(id: string) {
		this.selectedId = id;
	}

	toggleSelect($event: any, id: string): void {
		$event.preventDefault();
		$event.stopPropagation();
		if (this.selectedId !== id) {
			this.onSelect(id);
		}
	}

	onOpen() {
		this.selected = true;
		this.changeNavbar(this.navProps.state.TOOLBAR);
	}

	onClose() {
		this.selected = false;
		this.changeNavbar(this.navProps.state.SEARCHBAR);
	}

	changeNavbar(state: string) {
		this.navProps.changeState(state);
	}

	clearSelection(): void {
		$('.collapsible-header').removeClass(() => 'active');
		this.selected = false;
	}

	getEditLink(): string {
		return `${this.getLink()}/${this.selectedId}`;
	}
}
