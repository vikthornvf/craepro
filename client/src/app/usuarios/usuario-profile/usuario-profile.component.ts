import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { UsuarioService } from '../usuario.service';
import { EscolaService } from '../../escolas/escola.service';
import { Usuario } from '../usuario.model';
import { Escola } from '../../escolas/escola.model';
import { Enums } from '../../shared/enums';

@Component({
	selector: 'app-usuario-profile',
	templateUrl: './usuario-profile.component.html'
})
export class UsuarioProfileComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;
	usuario: Usuario;
	permissoes = [];

	constructor(
		private auth: AuthService,
		private service: UsuarioService,
		private escolaService: EscolaService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm();
		this.loadUsuario();
		Enums.Permissoes.forEach(permissao => {
			this.permissoes[permissao.value] = permissao.name;
		});
	}

	initForm(): void {
		this.form = this.fb.group({
			'nome': null,
			'email': this.fb.control(null, [Validators.required, Validators.email])
		});
	}

	loadUsuario(): void {
		const usuario = this.service.loadLoggedUsuario();
		this.form.patchValue({
			'nome': usuario.nome,
			'email': usuario.email
		});
		this.usuario = usuario;
		// const details = this.auth.getUsuarioDetails();
		// this.form.patchValue({
		// 	'nome': details.nome,
		// 	'email': details.email
		// });
		// this.usuario = details;
	}

	onSave(): void {
		if (this.form.invalid) {
			this.submitted = true;
			return;
		}

		const usuario = this.usuario;
		usuario.nome = this.form.get('nome').value;
		usuario.email = this.form.get('email').value;

		this.usuario = this.service.save(usuario);
		this.submitted = false;
	}

	onLogout(): void {
		this.service.logout();
	}
}
