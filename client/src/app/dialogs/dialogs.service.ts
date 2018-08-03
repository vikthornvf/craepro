import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

declare var Materialize: any, $: any;

@Injectable()
export class DialogsService {

	readonly TYPE = {
		CONFIRM: 1,
		DELETE: 2
	};

	label = new BehaviorSubject<string>(null);
	text = new BehaviorSubject<string>(null);
	icon = new BehaviorSubject<string>(null);
	callback = new BehaviorSubject<Function>(null);

	private invokeDialog$ = new BehaviorSubject<number>(null);
	invokeDialog = this.invokeDialog$.asObservable();

	modalConfirmation(callback: Function, text: string, icon?: string) {
		this.callback.next(callback);
		this.text.next(text);
		this.icon.next(icon);
		this.invokeDialog$.next(this.TYPE.CONFIRM);
	}

	modalDelete(callback: Function, label?: string) {
		this.callback.next(callback);
		this.label.next(label);
		this.invokeDialog$.next(this.TYPE.DELETE);
	}

	onCloseModal(): void {
		this.label.next(null);
		this.text.next(null);
		this.icon.next(null);
	}

	toast(msg: string, time?: number, style?: string): void {
		if (msg) {
			time = !time ? 7000 : time;
			style = !style ? '' : style;
			Materialize.toast(msg, time, style);
		}
	}

	toastSuccess(msg: string, time?: number, style?: string): void {
		if (msg) {
			time = !time ? 3500 : time;
			style = !style ? '' : style;
			const $toastContent = $(`
				<span>
					<i class="teal-text text-lighten-2 material-icons left">offline_pin</i>
					${msg}
				</span>
			`);
			Materialize.toast($toastContent, time, style);
		}
	}

	toastFail(msg: string, time?: number, style?: string): void {
		if (msg) {
			time = !time ? 7000 : time;
			style = !style ? '' : style;
			const $toastContent = $(`
				<span>
					<i class="red-text text-lighten-2 material-icons left">warning</i>
					${msg}
				</span>
			`);
			Materialize.toast($toastContent, time, style);
		}
	}
}
