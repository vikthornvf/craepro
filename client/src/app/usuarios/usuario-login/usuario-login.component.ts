import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-usuario-login',
	templateUrl: './usuario-login.component.html'
})
export class UsuarioLoginComponent implements OnInit {

	path: string;
	form: FormGroup;
	submitted: boolean;
	error: string;

	constructor(
		private auth: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder) {}

	ngOnInit() {
		this.route.params.subscribe((params) => this.path = params['path']);
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

		const email = this.email.value;
		const senha = this.senha.value;
		this.auth.login({ email, senha }).subscribe(
			(res) => this.router.navigateByUrl(this.path ? ('/' + this.path) : '/dashboard'),
			(err) => {
				console.log(err);
				const message = err['error']['message'];
				if (message) {
					this.error = message;
				}
			}
		);

		this.submitted = false;
	}

	get email() { return this.form.get('email'); }

	get senha() { return this.form.get('senha'); }
}
