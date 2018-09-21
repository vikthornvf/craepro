import { Pipe, PipeTransform } from '@angular/core';

import { Enums } from '../shared/enums';

@Pipe({
	name: 'tipoUsuarioPipe'
})
export class TipoUsuarioPipe implements PipeTransform {
	transform(value: string, args: any[]): string {
		if (value === null) {
			return '';
		}
		const tipoUsuario = Enums.TipoUsuario.find(s => s.value === value);
		return tipoUsuario ? tipoUsuario.name : '';
	}
}
