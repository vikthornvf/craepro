import { Pipe, PipeTransform } from '@angular/core';

import { Enums } from '../shared/enums';

@Pipe({
	name: 'seriePipe'
})
export class SeriePipe implements PipeTransform {
	transform(value: string, args: any[]): string {
		if (value === null) {
			return '';
		}
		const serie = Enums.Series.find(s => s.value === value);
		return serie ? serie.name : '';
	}
}
