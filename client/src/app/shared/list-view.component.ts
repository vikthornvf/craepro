import { Component, OnInit, OnDestroy, Injectable, NgZone } from '@angular/core';
import { NavbarService } from '../nav/navbar/navbar.service';
import { Subscription } from 'rxjs/Subscription';

declare var $;

@Injectable()
export abstract class ListViewComponent implements OnInit, OnDestroy {

	keyword: string;
	keywordObservable: Subscription;
	toolbarObservable: Subscription;

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
		private navService: NavbarService) {}

	abstract loadList(): void;
	abstract getLink(): string;

	ngOnInit(): void {
		this.loadList();
		this.navService.changeState(this.navService.state.SEARCHBAR);
		this.keywordObservable = this.navService.keyword.subscribe(keyword => this.keyword = keyword);
		this.toolbarObservable = this.navService.toolbar.subscribe(code => this.toolbarFunctions(code));
	}

	ngOnDestroy(): void {
		this.navService.changeState(this.navService.state.NAVBAR);
		this.keywordObservable.unsubscribe();
		this.toolbarObservable.unsubscribe();
	}

	toolbarFunctions(code: number) {
		const tools = this.navService.tools;
		switch (code) {
			case tools.SELECTION: {
				this.clearSelection();
				break;
			}
			case tools.EDIT: {
				this.navService.onNavigate(this.getEditLink());
				break;
			}
			case tools.DELETE: {
				console.log('DELETE');
				// TODO
				break;
			}
		}
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
		this.changeNavbar(this.navService.state.TOOLBAR);
	}

	onClose() {
		this.selected = false;
		this.changeNavbar(this.navService.state.SEARCHBAR);
	}

	changeNavbar(state: string) {
		this.navService.changeState(state);
	}

	clearSelection(): void {
		$('.collapsible-header').removeClass(() => 'active');
		this.onClose();
	}

	getEditLink(): string {
		return `/${this.getLink()}/${this.selectedId}`;
	}
}
