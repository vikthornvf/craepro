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
				this.zone.run(() => this.selected = true);
			},
			onClose: (el) => {
				let elementId;
				try {
					elementId = el[0].firstElementChild.firstElementChild;
				} catch (err) {}
				if (this.currentElementId === elementId) {
					this.zone.run(() => this.selected = false);
				}
			}
		}
	];

	constructor(
		private zone: NgZone,
		private navProps: NavbarService) {}

	abstract loadList(): void;

	ngOnInit(): void {
		this.keywordObservable = this.navProps.keyword.subscribe(keyword => this.keyword = keyword);
		this.navProps.changeState(this.navProps.state.SEARCHBAR);
		this.navProps.changeNavbarSearch(true);
		this.loadList();
	}

	ngOnDestroy(): void {
		this.keywordObservable.unsubscribe();
	}

	toggleSelect($event: any, alunoId: string): void {
		$event.preventDefault();
		$event.stopPropagation();
		if (this.selectedId !== alunoId) {
			this.selectedId = alunoId;
		}
	}

	clearSelection(): void {
		$('.collapsible-header').removeClass(() => 'active');
		this.selected = false;
	}

	private changeNavbar(state: string) {
		// TODO
	}
}
