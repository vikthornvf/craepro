import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DialogsService } from './dialogs.service';

@Component({
	selector: 'app-dialogs',
	templateUrl: './dialogs.component.html'
})
export class DialogsComponent implements OnInit, OnDestroy {

	dialogType = 0;
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
				this.callback = this.service.callback.value;
				this.label = this.service.label.value;
				this.text = this.service.text.value;
				this.onOpen();
			}
		});
	}

	ngOnDestroy(): void {
		this.dialogSubscription.unsubscribe();
	}

	private onOpen() {
		this.modalActions.emit({ action: 'modal', params: ['open'] });
	}

	private onClose() {
		if (this.callback && this.callback instanceof Function) {
			this.callback(this.confirm);
		}
		this.service.onCloseModal();
		this.dialogType = null;
		this.callback = null;
		this.label = null;
		this.text = null;
	}
}
