import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService, EmailData } from './home.service';
import { NavService } from '../nav/nav.service';

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
		const data: EmailData = {
			sender: this.nome.value,
			email: this.email.value,
			phone: this.telefone.value,
			message: this.mensagem.value,
		};
		this.service.sendEmail(data);
	}

	get nome(): AbstractControl { return this.form.get('nome'); }

	get email(): AbstractControl { return this.form.get('email'); }

	get telefone(): AbstractControl { return this.form.get('telefone'); }

	get mensagem(): AbstractControl { return this.form.get('mensagem'); }
}
