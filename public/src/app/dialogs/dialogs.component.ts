import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';
import { Subscription } from 'rxjs';

import { DialogsService } from './dialogs.service';

declare var $;

@Component({
	selector: 'app-dialogs',
	templateUrl: './dialogs.component.html',
	styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit, OnDestroy {

	dialogType = 0;
	icon: string;
	text: string;
	label: string;
	confirm: boolean;
	callback: Function;
	dialogSubscription: Subscription;

	modalActions = new EventEmitter<string|MaterializeAction>();
	modalParams = [{ complete: () => this.onClose() }];

	constructor(private service: DialogsService) {}

	ngOnInit(): void {
		this.dialogSubscription = this.service.invokeDialog.subscribe(dialogType => {
			if (dialogType) {
				this.dialogType = dialogType;
				this.callback = this.service.callback.getValue();
				this.icon = this.service.icon.getValue();
				this.text = this.service.text.getValue();
				this.label = this.service.label.getValue();
				this.onOpen();
			}
		});
	}

	ngOnDestroy(): void {
		this.dialogSubscription.unsubscribe();
	}

	private onOpen() {
		$('#dialogs').modal();
		this.modalActions.emit({ action: 'modal', params: ['open'] });
	}

	private onClose() {
		if (this.callback && this.callback instanceof Function) {
			this.callback(this.confirm);
		}
		this.service.onCloseModal();
		this.dialogType = null;
		this.callback = null;
		this.icon = null;
		this.text = null;
		this.label = null;
	}
}
