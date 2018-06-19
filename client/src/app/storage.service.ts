import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

	private DEFAULT_KEY = 'craepro-token';
	private storage;
	private storageTemp;

	constructor() {
		this.storage = window.localStorage;
		this.storageTemp = window.sessionStorage;
	}

	public getItem(key?: string, temporary?: boolean): any {
		if (!key) {
			key = this.DEFAULT_KEY;
		}
		const item = temporary
			? this.storageTemp.getItem(key)
			: this.storage.getItem(key);
		return JSON.parse(item);
	}

	public setItem(item: any, temporary?: boolean, key?: string) {
		if (!key) {
			key = this.DEFAULT_KEY;
		}
		item = JSON.stringify(item);
		if (temporary) {
			this.storageTemp.setItem(key, item);
		} else {
			this.storage.setItem(key, item);
		}
	}

	public removeItem(temporary?: boolean, key?: string) {
		if (!key) {
			key = this.DEFAULT_KEY;
		}
		if (temporary) {
			this.storageTemp.removeItem(key);
		} else {
			this.storage.removeItem(key);
		}
	}
}
