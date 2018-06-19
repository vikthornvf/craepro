import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { EscolaService } from '../../escolas/escola.service';
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

	constructor(
		private service: UsuarioService,
		private escolaService: EscolaService,
		private fb: FormBuilder) {}

	ngOnInit() {
		this.form = this.fb.group({
			'nome': this.fb.control(null, Validators.required),
			'email': this.fb.control(null, [Validators.required, Validators.email]),
			'senha': this.fb.control(null, [Validators.required, Validators.minLength(6)]),
			'senhaConfirm': null,
			'tipo': this.fb.control(null, Validators.required),
			'escola': this.fb.control(null),
		}, {
			validator: this.validateSenha
		});
		this.loadEscolas();
	}

	loadEscolas() {
		this.escolas = this.escolaService.list();
	}

	onBlurSenha() {
		this.senhaBlured = true;
	}

	onSignup() {
		if (this.form.invalid) {
			this.submitted = true;
			$(document).ready(function() {
				$('select').material_select();
			});
			return;
		}

		let usuario = new Usuario();
		usuario.nome = this.nome.value();
		usuario.email = this.email.value();
		usuario.senha = this.senha.value();
		usuario.tipo = this.tipo.value();
		usuario.escola = this.escola.value();
		usuario.solicitado = true;

		usuario = this.service.save(usuario);
		this.service.login(usuario);

		this.submitted = true;
	}

	validateSenha(ac: AbstractControl): {[s: string]: boolean} {
		const senha = ac.get('senha').value;
		const senhaConfirm = ac.get('senhaConfirm').value;
		if (senha !== senhaConfirm) {
			return {'senhaDiferente': true};
		}
		return null;
	}

	get nome() { return this.form.get('nome'); }

	get email() { return this.form.get('email'); }

	get senha() { return this.form.get('senha'); }

	get senhaConfirm() { return this.form.get('senhaConfirm'); }

	get tipo() { return this.form.get('tipo'); }

	get escola() { return this.form.get('escola'); }
}
