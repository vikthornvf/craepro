import { Component, OnInit } from '@angular/core';
import { AuthService, UsuarioDetails } from '../auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

	private usuario: UsuarioDetails;

	constructor(private auth: AuthService) {}

	ngOnInit() {
		this.usuario = this.auth.getUsuarioDetails();
	}
}
