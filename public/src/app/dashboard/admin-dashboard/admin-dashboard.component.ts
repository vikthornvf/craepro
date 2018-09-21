import { Component, Input } from '@angular/core';
import { UsuarioDetails } from '../../auth.service';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {

	@Input() usuario: UsuarioDetails;
}
