import { Pipe, PipeTransform } from '@angular/core';

import { Enums } from '../shared/enums';

@Pipe({
	name: 'diasSemanaPipe'
})
export class DiasSemanaPipe implements PipeTransform {
	transform(value: string, args: any[]): string {
		if (value === null) {
			return '';
		}
		const dia = Enums.Dias.find(s => s.value + '' === value);
		return dia ? dia.name : '';
	}
}

@Pipe({
	name: 'diasSemanaShortPipe'
})
export class DiasSemanaShortPipe implements PipeTransform {
	transform(value: string, args: any[]): string {
		if (value === null) {
			return '';
		}
		const dia = Enums.Dias.find(s => s.value + '' === value);
		return dia ? dia.name : '';
	}
}
