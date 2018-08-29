import { Pipe, PipeTransform } from '@angular/core';

import { Enums } from '../shared/enums';

@Pipe({
	name: 'tipoAtendimentoPipe'
})
export class TipoAtendimentoPipe implements PipeTransform {
	transform(value: string[], args: any[]): string {
		if (value === null) {
			return '';
		}
		let atts = '';
		value.forEach((v, i) => {
			const att = Enums.Atts.find(s => s.value === v);
			if (i === 0) {
				atts += att.name;
			} else {
				atts += `, ${att.name}`;
			}
		});
		return atts;
	}
}
