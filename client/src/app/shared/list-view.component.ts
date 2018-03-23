import { Component, OnInit, OnDestroy, Injectable, NgZone, ViewChild } from '@angular/core';
import { NavbarService } from '../nav/navbar/navbar.service';
import { Subscription } from 'rxjs/Subscription';

declare var $;

@Injectable()
export abstract class ListViewComponent implements OnInit, OnDestroy {

	@ViewChild('atendimentoList') atendimentoList;
	@ViewChild('deleteConfirmModal') deleteConfirmModal;

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
				this._zone.run(() => this.onOpen());
			},
			onClose: (el) => {
				let elementId;
				try {
					elementId = el[0].firstElementChild.firstElementChild;
				} catch (err) {}
				if (this.currentElementId === elementId) {
					this._zone.run(() => this.onClose());
				}
			}
		}
	];

	abstract link: string;

	constructor(
		private _zone: NgZone,
		private navService: NavbarService) {}

	abstract loadList(): void;

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
		}
	}

	onSimpleSelect(id: string) {
		if (this.selectedId === id) {
			this.selectedId = null;
			this.onClose();
		} else {
			this.onSelect(id);
			this.onOpen();
		}
	}

	onSelect(id: string) {
		this.selectedId = id;
		this.navService.changeLink(this.getEditLink());
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
		if (this.atendimentoList) {
			this.atendimentoList.onDeselect();
		}
	}

	changeNavbar(state: string) {
		this.navService.changeState(state);
	}

	clearSelection(): void {
		$('.collapsible-header').removeClass(() => 'active');
		this.onClose();
	}

	getEditLink(): string[] {
		return [this.link, this.selectedId];
	}
}
