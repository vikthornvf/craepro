import { Pipe, PipeTransform } from '@angular/core';
import { Enums } from '../shared/enums';

@Pipe({
	name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {
	transform(value: string, args: any[]): string {
		if (value === null) {
			return '';
		}
		const status = Enums.Status.find(s => s.value === value);
		return status ? status.name : '';
	}
}
