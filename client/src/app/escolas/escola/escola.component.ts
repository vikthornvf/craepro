import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { EscolaService } from '../escola.service';
import { NavService } from '../../nav/nav.service';
import { Escola } from '../escola.model';

@Component({
	selector: 'app-escola',
	templateUrl: './escola.component.html'
})
export class EscolaComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;
	loaded: boolean;
	canEdit: boolean;

	escola: Escola = {};

	constructor(
		private service: EscolaService,
		private navService: NavService,
		private dialogs: DialogsService,
		private auth: AuthService,
		private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.initForm();
		this.route.params.subscribe(params => {
			const id = params['id'];
			if (id) {
				this.loadEscola(id);
			} else {
				this.initEscola();
			}
		});
		this.userAuth();
	}

	userAuth() {
		const auth = this.auth.getUsuarioDetails().permissoes;
		this.canEdit = auth.includes('E2');
	}

	initForm(): void {
		this.form = new FormGroup({
			'nome': new FormControl(null, Validators.required),
		});
	}

	loadEscola(id: string): void {
		this.service.findById(id).subscribe(
			escola => {
				this.escola = escola;
				this.form.patchValue({ 'nome': escola.nome });
				this.loaded = true;
			},
			err => console.log(err));
	}

	initEscola(): void {
		this.escola = new Escola();
		this.escola.qtdAlunos = 0;
		this.escola.telefones = [];
		this.escola.enderecos = [];
		this.loaded = true;
	}

	onSave(): void {
		if (this.form.invalid) {
			this.submitted = true;
			return;
		}

		const escola = this.escola;
		escola.nome = this.form.get('nome').value;

		this.escola = this.service.save(escola);
		this.submitted = false;
	}

	onConfirmDelete(): void {
		const label = this.escola.nome ? this.escola.nome : 'Escola';
		this.dialogs.modalDelete(confirm => this.onDelete(confirm), label);
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			this.service.delete(this.escola._id);
			this.navService.onNavigateBack();
		}
	}

	cancel(): void {
		this.navService.onNavigateBack();
	}
}
