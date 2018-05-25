import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../dialogs/dialogs.service';
import { UsuarioService } from '../usuario.service';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { Usuario } from '../usuario.model';
import { Enums } from '../../shared/enums';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;

	usuario: Usuario;
	permissoes = Enums.Permissoes;

	constructor(
		private dialogs: DialogsService,
		private service: UsuarioService,
		private navService: NavbarService,
		private _route: ActivatedRoute,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm();
		this._route.params.subscribe(params => {
			const id = params['id'];
			if (id) {
				this.loadUsuario(id);
			}
			else {
				this.initUsuario();
			}
		});
	}

	initForm(): void {
		this.form = this.fb.group({
			'nome': null,
			'email': this.fb.control(null, [Validators.required, Validators.email])
		});
		this.permissoes.forEach(
			permissao => this.form.addControl(`has${permissao.value}`, this.fb.control(false))
		);
	}

	loadUsuario(id: string): void {
		const usuario = this.service.findById(id);
		this.usuario = usuario;
		this.form.patchValue({
			'nome': usuario.nome,
			'email': usuario.email
		});
		this.usuario.permissoes.forEach(permissao => {
			this.form.get(`has${permissao}`).patchValue(true);
		});
	}

	initUsuario(): void {
		this.usuario = new Usuario();
		this.usuario.permissoes = [];
	}

	onSave(): void {
		if (this.form.invalid) {
			this.submitted = true;
			return;
		}

		const usuario = this.usuario;
		usuario.nome = this.form.get('nome').value;
		usuario.email = this.form.get('email').value;
		usuario.permissoes = this.buildPermissoesArray();

		this.usuario = this.service.save(usuario);
		this.submitted = false;
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			this.service.delete(this.usuario._id);
			this.navService.onNavigateBack();
		}
	}

	onConfirmDelete(): void {
		const label = this.usuario.nome ? this.usuario.nome : 'usuario';
		this.dialogs.modalDelete(confirm => this.onDelete(confirm), label);
	}

	buildPermissoesArray(): string[] {
		const str = [];
		this.permissoes.forEach(permissao => {
			if (this.form.get(`has${permissao.value}`).value) {
				str.push(permissao.value);
			}
		});
		return str;
	}
}
