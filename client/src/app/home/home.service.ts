import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EmailData {
	sender: string;
	email: string;
	phone: string;
	message: string;
}

@Injectable()
export class HomeService {

	constructor(private http: HttpClient) {}

	sendEmail(data: EmailData) {
		console.log(data);
		// TODO
	}
}
