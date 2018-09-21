import { Component, Input, OnInit } from '@angular/core';
import { UsuarioDetails } from '../../auth.service';

@Component({
	selector: 'app-profissional-dashboard',
	templateUrl: './profissional-dashboard.component.html'
})
export class ProfissionalDashboardComponent implements OnInit {

	@Input() usuario: UsuarioDetails;

	ngOnInit() {}
}
