import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DialogsService } from '../dialogs/dialogs.service';

export interface EmailData {
	sender: string;
	email: string;
	phone: string;
	message: string;
}

@Injectable()
export class HomeService {

	constructor(
		private http: HttpClient,
		private dialogs: DialogsService) {}

	sendEmail(data: EmailData) {
		// TODO
		return new Promise((resolve) => {
			setTimeout(() => {
				this.dialogs.toastSuccess('Mensagem enviada com sucesso!');
				resolve();
			}, 3000);
		});
	}
}
