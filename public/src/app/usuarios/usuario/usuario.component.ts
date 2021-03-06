import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { EscolaService } from '../../escolas/escola.service';
import { NavService } from '../../nav/nav.service';
import { UsuarioService } from '../usuario.service';
import { Escola } from '../../escolas/escola.model';
import { Usuario } from '../usuario.model';
import { Enums } from '../../shared/enums';

declare var $: any;

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;
	loaded: boolean;
	canEdit: boolean;

	usuario: Usuario = {};
	escolas: Escola[] = [];
	tiposUsuario = Enums.TipoUsuario;
	permissoes = Enums.Permissoes;

	constructor(
		private dialogs: DialogsService,
		private service: UsuarioService,
		private escolaService: EscolaService,
		private navService: NavService,
		private auth: AuthService,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private _zone: NgZone) {}

	ngOnInit(): void {
		this.initForm();
		this.route.params.subscribe(params => {
			const id = params['id'];
			if (id) {
				this.loadUsuario(id);
			}
			else {
				this.initUsuario();
			}
		});
		this.loadEscolas();
		this.userAuth();
	}

	userAuth() {
		const auth = this.auth.getUsuarioDetails().permissoes;
		this.canEdit = auth.includes('U2');
	}

	onSelectTipo(value: string): void {
		if (!value || value === 'O') {
			return;
		}
		const tipoUsuario = this.tiposUsuario.find(t => t.value === value);
		this.permissoes.forEach(p => this.form.get(`has${p.value}`).patchValue(false));
		tipoUsuario.auth.forEach(a => this.form.get(`has${a}`).patchValue(true));
	}

	onChangePermissions(): void {
		const permissoes = this.buildPermissoesArray();
		const tipoUsuario = this.tiposUsuario.find(t => t.auth.length === permissoes.length && t.auth.every((v, i) => v === permissoes[i]));
		this.form.patchValue({ 'tipo': tipoUsuario ? tipoUsuario.value : 'O' });
	}

	initForm(): void {
		this.form = this.fb.group({
			'nome': this.fb.control(null, Validators.required),
			'email': this.fb.control(null, [Validators.required, Validators.email]),
			'tipo': this.fb.control(null, Validators.required),
			'escola': null
		});
		this.permissoes.forEach(p => this.form.addControl(`has${p.value}`, this.fb.control(false)));
	}

	loadEscolas(): void {
		this.escolaService.list().subscribe(
			escolas => {
				this.escolas = escolas;
				this.updateDropdownState();
			},
			err => console.log(err));
	}

	loadUsuario(id: string): void {
		this.service.findById(id).subscribe(
			usuario => {
				this.usuario = usuario;
				this.form.patchValue({
					'nome': usuario.nome,
					'email': usuario.email,
					'tipo': usuario.tipo,
					'escola': usuario.escola
				});
				this.usuario.permissoes.forEach(p => this.form.get(`has${p}`).patchValue(true));
				this.loaded = true;
			},
			err => console.log(err));
	}

	initUsuario(): void {
		this.usuario = new Usuario();
		this.usuario.permissoes = [];
		this.loaded = true;
	}

	onSave(): void {
		if (this.form.invalid || !this.buildPermissoesArray().length) {
			if (!this.buildPermissoesArray().length) {
				this.dialogs.toastFail('O Usuário deve ter ao menos uma permissão.');
			}
			this.submitted = true;
			this.updateDropdownState();
			return;
		}

		const usuario = this.usuario;
		usuario.nome = this.form.get('nome').value;
		usuario.email = this.form.get('email').value;
		usuario.tipo = this.form.get('tipo').value;
		usuario.escola = usuario.tipo !== 'E' ? null : new Escola(this.form.get('escola').value);
		usuario.permissoes = this.buildPermissoesArray();
		if (!usuario.permissoes) {
			usuario.permissoes = [];
		}

		this.usuario = this.service.save(usuario);
		this.submitted = false;
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			this.service.delete(this.usuario._id);
			this.navService.onNavigateBack();
		}
	}

	onConfirmUsuario(): void {
		this.dialogs.modalConfirmation(confirm => {
			if (confirm) {
				this._zone.run(() => this.service.confirmUsuario(this.usuario));
			}
		}, 'Deseja realmente confirmar e permitir o acesso ao usuário?');
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

	updateDropdownState() {
		$(document).ready(function() {
			$('select').material_select();
		});
	}
}
