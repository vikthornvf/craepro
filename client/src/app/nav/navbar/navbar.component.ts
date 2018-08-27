import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, Renderer2, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavService } from '../nav.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { AuthService, UsuarioDetails } from '../../auth.service';

declare var $;

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

	state: string = this.navService.state.NAVBAR;
	stateObservable: Subscription;
	hideSidebarObservable: Subscription;
	sidenavWrapper: boolean;
	usuario: UsuarioDetails;

	now = new Date().getTime();
	@ViewChild('nav') nav: ElementRef;
	@HostListener('window:scroll', ['$event'])
	checkScroll() {
		if (this.state !== this.navService.state.HOMEBAR) {
			return;
		}
		const scrollPosition = window.pageYOffset;
		if (new Date().getTime() - this.now > 150 || scrollPosition === 0) {
			this.now = new Date().getTime();
			if (scrollPosition >= 56) {
				this.renderer.addClass(this.nav.nativeElement, 'filled');
			} else {
				this.renderer.removeClass(this.nav.nativeElement, 'filled');
			}
		}
	}

	constructor(
		private navService: NavService,
		private dialogs: DialogsService,
		private auth: AuthService,
		private renderer: Renderer2,
		private _zone: NgZone) {}

	ngOnInit() {
		this.usuario = this.auth.getUsuarioDetails();
		this.stateObservable = this.navService.barState.subscribe(barState => this.state = barState);
		this.hideSidebarObservable = this.navService.hideSidebar.subscribe(hide => this.sidenavWrapper = !hide);
		this.updateDropdownState();
	}

	ngOnDestroy() {
		this.stateObservable.unsubscribe();
		this.hideSidebarObservable.unsubscribe();
	}

	updateDropdownState() {
		$(document).ready(function() {
			$('select').material_select();
		});
	}

	onLogout() {
		this.dialogs.modalConfirmation(confirm => {
			if (confirm) { this._zone.run(() => this.auth.logout()); }
		}, 'Deseja realmente sair da sua conta de usuário?', 'power_settings_new');
	}

	onBack() {
		this.navService.onNavigateBack();
	}
}
