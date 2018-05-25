import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
	selector: 'app-usuario-password',
	templateUrl: './usuario-password.component.html'
})
export class UsuarioPasswordComponent implements OnInit {

	form: FormGroup;
	usuario: Usuario;

	constructor(
		private service: UsuarioService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm();
		this.loadUsuario();
	}

	initForm(): void {
		// TODO validators
		this.form = this.fb.group({
			'password': '',
			'passwordEqual': ''
		});
	}

	loadUsuario(): void {

	}
}
