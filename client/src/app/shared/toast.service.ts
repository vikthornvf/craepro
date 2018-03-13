declare var Materialize: any, $: any;

export class ToastService {

	static toast(msg: string, time?: number, style?: string): void {
		if (msg) {
			time = !time ? 7000 : time;
			style = !style ? '' : style;
			Materialize.toast(msg, time, style);
		}
	}

	static toastSuccess(msg: string, time?: number, style?: string): void {
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

	static toastFail(msg: string, time?: number, style?: string): void {
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
