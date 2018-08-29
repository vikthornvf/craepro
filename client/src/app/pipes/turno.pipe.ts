import { Pipe, PipeTransform } from '@angular/core';

import { Enums } from '../shared/enums';

@Pipe({
	name: 'turnoPipe'
})
export class TurnoPipe implements PipeTransform {
	transform(value: string, args: any[]): string {
		if (value === null) {
			return '';
		}
		const turno = Enums.Turnos.find(s => s.value === value);
		return turno ? turno.name : '';
	}
}
