import { Component, OnInit, Input } from '@angular/core';

declare var Materialize: any;

@Component({
	selector: 'app-telefone',
	templateUrl: './telefone.component.html'
})
export class TelefoneComponent implements OnInit {

	@Input() telefones: string[];

	ngOnInit(): void {
		if (!this.telefones.length) {
			this.addTelefone();
		}
	}

	addTelefone(telefone?: string): void {
		this.telefones.push(telefone);
		setTimeout(() => Materialize.updateTextFields(), 200);
	}

	removeTelefone(index: number): void {
		this.telefones.splice(index, 1);
	}

	customTrackBy(index: number, obj: any): any {
		return index;
	}
}
