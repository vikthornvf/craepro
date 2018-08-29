import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { NavService } from '../../nav/nav.service';
import { ProfissionalService } from '../profissional.service';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { Profissional } from '../profissional.model';

@Component({
	selector: 'app-profissional',
	templateUrl: './profissional.component.html'
})
export class ProfissionalComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;
	loaded: boolean;
	canEdit: boolean;

	profissional: Profissional;
	atendimentos: Atendimento[];

	@ViewChild('deleteConfirmModal') deleteConfirmModal;

	constructor(
		private dialogs: DialogsService,
		private service: ProfissionalService,
		private navService: NavService,
		private auth: AuthService,
		private route: ActivatedRoute,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm();
		this.route.params.subscribe(params => {
			const id = params['id'];
			if (id) {
				this.loadProfissional(id);
			} else {
				this.initProfissional();
			}
		});
		this.userAuth();
	}

	userAuth() {
		const auth = this.auth.getUsuarioDetails().permissoes;
		this.canEdit = auth.includes('P2');
	}

	initForm(): void {
		this.form = this.fb.group({
			'nome': this.fb.control(null, Validators.required),
			'hasAee': null,
			'hasFono': null,
			'hasPsico': null
		});
	}

	loadProfissional(id: string): void {
		this.service.findById(id).subscribe(
			profissional => {
				this.profissional = profissional;
				this.form.patchValue({
					'nome': profissional.nome,
					'hasAee': profissional.atendimentoTipos.includes('A'),
					'hasFono': profissional.atendimentoTipos.includes('F'),
					'hasPsico': profissional.atendimentoTipos.includes('P'),
				});
				this.loaded = true;
			},
			err => console.log(err));
	}

	initProfissional(): void {
		this.profissional = new Profissional();
		this.profissional.telefones = [];
		this.profissional.enderecos = [];
		this.profissional.atendimentoTipos = [];
		this.loaded = true;
	}

	onSave(): void {
		if (this.form.invalid) {
			this.submitted = true;
			return;
		}

		const profissional = this.profissional;
		profissional.nome = this.form.get('nome').value;
		profissional.atendimentoTipos = this.buildAtendimentoTiposArray();

		this.profissional = this.service.save(profissional);
		this.submitted = false;
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			this.service.delete(this.profissional._id);
			this.navService.onNavigateBack();
		}
	}

	onConfirmDelete(): void {
		const label = this.profissional.nome ? this.profissional.nome : 'Profissional';
		this.dialogs.modalDelete(confirm => this.onDelete(confirm), label);
	}

	buildAtendimentoTiposArray(): string[] {
		const str = [];
		if (this.form.get('hasAee').value) {
			str.push('A');
		}
		if (this.form.get('hasFono').value) {
			str.push('F');
		}
		if (this.form.get('hasPsico').value) {
			str.push('P');
		}
		return str;
	}
}
