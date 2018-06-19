import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';

declare var Materialize: any;

@Component({
	selector: 'app-usuario-login',
	templateUrl: './usuario-login.component.html'
})
export class UsuarioLoginComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;

	constructor(
		private usuarioService: UsuarioService,
		private fb: FormBuilder) {}

	ngOnInit() {
		this.form = this.fb.group({
			'email': this.fb.control(null, [Validators.required, Validators.email]),
			'senha': this.fb.control(null, Validators.required),
			'lembrar': true
		});
	}

	onLogin() {
		if (this.form.invalid) {
			this.submitted = true;
			return;
		}

		this.usuarioService.login();

		this.submitted = true;
	}

	get email() { return this.form.get('email'); }

	get senha() { return this.form.get('senha'); }
}
