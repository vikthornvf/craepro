import { Pipe, PipeTransform } from '@angular/core';
import { Enums } from '../shared/enums';

@Pipe({
	name: 'situacaoPipe'
})
export class SituacaoPipe implements PipeTransform {
	transform(value: string, args: any[]): string {
		if (value === null) {
			return '';
		}
		const situacao = Enums.Situacao.find(s => s.value === value);
		return situacao ? situacao.name : '';
	}
}
