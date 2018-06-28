import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
	selector: 'app-usuario-password',
	templateUrl: './usuario-password.component.html'
})
export class UsuarioPasswordComponent implements OnInit {

	form: FormGroup;
	usuario: Usuario;
	submitted: boolean;
	senhaBlured: boolean;

	constructor(
		private service: UsuarioService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm();
		this.usuario = this.service.loadLoggedUsuario();
	}

	initForm(): void {
		this.form = this.fb.group({
			'senhaCurrent': null,
			'senha': this.fb.control(null, [Validators.required, Validators.minLength(4)]),
			'senhaConfirm': null,
		});
	}

	onSave() {
		if (this.form.invalid) {
			this.submitted = true;
		}
		this.usuario.senha = this.senha.value;
		this.service.save(this.usuario);
		this.submitted = false;
	}

	onBlurSenha() {
		this.senhaBlured = true;
	}

	validateSenha(ac: AbstractControl): {[s: string]: boolean} {
		const senha = ac.get('senha').value;
		const senhaConfirm = ac.get('senhaConfirm').value;
		if (senha !== senhaConfirm) {
			return {'senhaDiferente': true};
		}
		return null;
	}

	get senhaCurrent() { return this.form.get('senhaCurrent'); }

	get senha() { return this.form.get('senha'); }

	get senhaConfirm() { return this.form.get('senhaConfirm'); }
}
