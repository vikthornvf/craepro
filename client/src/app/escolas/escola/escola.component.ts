import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { EscolaService } from '../escola.service';
import { Escola } from '../escola.model';

@Component({
	selector: 'app-escola',
	templateUrl: './escola.component.html'
})
export class EscolaComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;

	escola: Escola;

	constructor(
		private service: EscolaService,
		private navService: NavbarService,
		private _route: ActivatedRoute) {}

	ngOnInit(): void {
		// this.initForm();
		// this._route.params.subscribe(params => {
		// 	const id = params['id'];
		// 	if (id) {
		// 		this.loadescola(id);
		// 	} else {
		// 		this.initescola();
		// 	}
		// });
	}

	// initForm(): void {
	// 	this.form = new FormGroup({
	// 		'nome': new FormControl(null, Validators.required),
	// 	});
	// }

	// loadescola(id: string): void {
	// 	this.escola = this.service.findById(id);
	// }

	// initescola(): void {
	// 	this.escola = new Escola();
	// }

	// onSave(): void {
	// 	if (this.form.invalid) {
	// 		this.submitted = true;
	// 		return;
	// 	}

	// 	const escola = this.escola;
	// 	escola.nome = this.form.get('nome').value;

	// 	this.service.save(escola);
	// 	this.submitted = false;
	// }

	// onDelete(confirm: boolean): void {
	// 	if (confirm) {
	// 		this.service.delete(this.escola._id);
	// 		this.navService.onNavigateBack();
	// 	}
	// }

	// cancel(): void {
	// 	this.navService.onNavigateBack();
	// }
}
