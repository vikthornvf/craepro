import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { EmailData, HomeService } from './home.service';
import { NavService } from '../nav/nav.service';

declare var $;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	form: FormGroup;
	submitted: boolean;
	loading: boolean;

	constructor(
		private service: HomeService,
		private navService: NavService) {}

	ngOnInit(): void {
		this.initForm();
		this.navService.changeState(this.navService.state.HOMEBAR);
		this.navService.onHideSidebar(true);
		$('div#sidenav-overlay').hide();
	}

	ngOnDestroy(): void {
		this.navService.changeState(this.navService.state.NAVBAR);
		this.navService.onHideSidebar(false);
	}

	initForm(): void {
		this.form = new FormGroup({
			'nome': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'telefone': new FormControl(null, Validators.required),
			'mensagem': new FormControl(null, Validators.required),
		});
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.submitted = true;
			return;
		}
		this.submitted = false;
		this.loading = true;
		const data: EmailData = {
			sender: this.nome.value,
			email: this.email.value,
			phone: this.telefone.value,
			message: this.mensagem.value,
		};
		this.service.sendEmail(data)
			.then((done) => {
				this.loading = false;
				this.form.reset();
			});

	}

	get nome(): AbstractControl { return this.form.get('nome'); }

	get email(): AbstractControl { return this.form.get('email'); }

	get telefone(): AbstractControl { return this.form.get('telefone'); }

	get mensagem(): AbstractControl { return this.form.get('mensagem'); }
}
