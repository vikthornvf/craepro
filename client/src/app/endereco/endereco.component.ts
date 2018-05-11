import { Component, OnInit, Input } from '@angular/core';
import { Endereco } from '../shared/endereco.model';

declare var Materialize: any;

@Component({
	selector: 'app-endereco',
	templateUrl: './endereco.component.html'
})
export class EnderecoComponent implements OnInit {

	@Input() enderecos: {}[];
	@Input() whiteButton: boolean;

	ngOnInit(): void {
		setTimeout(() => Materialize.updateTextFields(), 200);
	}

	addEndereco(endereco?: Endereco): void {
		if (!endereco) {
			endereco = new Endereco('Imbé');
		}
		this.enderecos.push(endereco);
		setTimeout(() => Materialize.updateTextFields(), 200);
	}

	removeEndereco(index: number): void {
		this.enderecos.splice(index, 1);
	}

	customTrackBy(index: number, obj: any): any {
		return index;
	}
}
