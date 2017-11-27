import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-responsavel',
	templateUrl: './responsavel.component.html'
})
export class ResponsavelComponent {

	@Input() alunoId: string;
	@Input() responsavel: {};

	onSave() {
		// TODO
	}
}
