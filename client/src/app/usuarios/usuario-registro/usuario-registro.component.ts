import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { EscolaService } from '../../escolas/escola.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { Usuario } from '../usuario.model';
import { Escola } from '../../escolas/escola.model';
import { Enums } from '../../shared/enums';

declare var $: any;

@Component({
	selector: 'app-usuario-registro',
	templateUrl: './usuario-registro.component.html'
})
export class UsuarioRegistroComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;
	senhaBlured: boolean;
	escolas: Escola[];
	tiposUsuario = Enums.TipoUsuario;
	error: string;

	constructor(
		private service: UsuarioService,
		private escolaService: EscolaService,
		private dialogs: DialogsService,
		private fb: FormBuilder) {}

	ngOnInit() {
		this.form = this.fb.group({
			'nome': this.fb.control(null, Validators.required),
			'email': this.fb.control(null, [Validators.required, Validators.email]),
			'senha': this.fb.control(null, [Validators.required, Validators.minLength(4)]),
			'senhaConfirm': null,
			'tipo': this.fb.control(null, Validators.required),
			'escola': this.fb.control(null),
		}, {
			validator: this.validateSenha
		});
		this.loadEscolas();
	}

	loadEscolas() {
		this.escolaService.list().subscribe(
			escolas => {
				this.escolas = escolas;
				this.updateDropdownState();
			},
			err => console.log(err));
	}

	onBlurSenha() {
		this.senhaBlured = true;
	}

	onSignup() {
		if (this.form.invalid) {
			this.submitted = true;
			this.updateDropdownState();
			return;
		}

		const usuario = new Usuario();
		usuario.nome = this.nome.value;
		usuario.email = this.email.value;
		usuario.senha = this.senha.value;
		usuario.tipo = this.tipo.value;
		usuario.permissoes = this.buildPermissoes(this.tipo.value);
		usuario.escola = this.escola.value;
		usuario.solicitado = true;

		this.service.onSave(usuario).subscribe(
			u => this.dialogs.toastSuccess(`Usuario ${u.nome} criado com sucesso!`),
			err => {
				const message = err['error']['errmsg'] as String;
				if (message) {
					if (message.includes('duplicate key')) {
						if (message.includes('email')) {
							this.error = 'Este email já foi cadastrado.';
						}
					}
				}
			});

		this.submitted = true;
	}

	buildPermissoes(value: string): string[] {
		const tipoUsuario = Enums.TipoUsuario.find(p => {
			return p.value === value;
		});
		if (tipoUsuario) {
			return tipoUsuario.auth;
		}
		return [];
	}

	validateSenha(ac: AbstractControl): {[s: string]: boolean} {
		const senha = ac.get('senha').value;
		const senhaConfirm = ac.get('senhaConfirm').value;
		if (senha !== senhaConfirm) {
			return {'senhaDiferente': true};
		}
		return null;
	}

	updateDropdownState() {
		$(document).ready(function() {
			$('select').material_select();
		});
	}

	get nome() { return this.form.get('nome'); }

	get email() { return this.form.get('email'); }

	get senha() { return this.form.get('senha'); }

	get senhaConfirm() { return this.form.get('senhaConfirm'); }

	get tipo() { return this.form.get('tipo'); }

	get escola() { return this.form.get('escola'); }
}
