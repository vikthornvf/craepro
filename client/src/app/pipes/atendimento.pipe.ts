import { Pipe, PipeTransform } from '@angular/core';
import { Enums } from '../shared/enums';

@Pipe({
	name: 'atendimentoPipe'
})
export class AtendimentoPipe implements PipeTransform {
	transform(value: string, args: any[]): string {
		if (value === null) {
			return '';
		}
		const att = Enums.Atts.find(s => s.value === value);
		return att ? att.name : '';
	}
}
