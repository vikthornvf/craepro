import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { UsuarioService } from '../usuario.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { Usuario } from '../usuario.model';
import { Enums } from '../../shared/enums';

@Component({
	selector: 'app-usuario-profile',
	templateUrl: './usuario-profile.component.html'
})
export class UsuarioProfileComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;
	usuario: Usuario;
	loaded: boolean;
	permissoes = [];

	constructor(
		private auth: AuthService,
		private service: UsuarioService,
		private dialogs: DialogsService,
		private fb: FormBuilder,
		private zone: NgZone) {}

	ngOnInit(): void {
		this.initForm();
		this.loadUsuario();
		Enums.Permissoes.forEach(permissao => {
			this.permissoes[permissao.value] = permissao.name;
		});
	}

	initForm(): void {
		this.form = this.fb.group({
			'nome': this.fb.control(null, Validators.required),
			'email': this.fb.control(null, [Validators.required, Validators.email])
		});
	}

	loadUsuario(): void {
		const details = this.auth.getUsuarioDetails();
		this.form.patchValue({
			'nome': details.nome,
			'email': details.email
		});
		this.usuario = details;
		this.loaded = true;
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
		this.dialogs.modalConfirmation(confirm => {
			if (confirm) { this.zone.run(() => this.auth.logout()); }
		}, 'Deseja realmente sair da sua conta de usuário?', 'power_settings_new');
	}
}
