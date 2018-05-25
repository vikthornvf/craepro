import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { Enums } from '../../shared/enums';

@Component({
	selector: 'app-usuario-profile',
	templateUrl: './usuario-profile.component.html'
})
export class UsuarioProfileComponent implements OnInit {

	form: FormGroup;
	usuario: Usuario;
	permissoes = [];

	constructor(
		private service: UsuarioService,
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
	}

	onLogout(): void {
		this.service.logout();
	}
}
