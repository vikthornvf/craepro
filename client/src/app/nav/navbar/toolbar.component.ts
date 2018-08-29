import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../auth.service';
import { NavService } from '../nav.service';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

	hasAtt = false;
	hasAttSubscription: Subscription;
	canEditAtt: boolean;

	link: string[];
	linkSubscription: Subscription;
	link$: Observable<string[]>;

	tool = this.navService.tools;

	constructor(private navService: NavService, private auth: AuthService) {}

	ngOnInit(): void {
		this.hasAttSubscription = this.navService.hasAtt.subscribe(hasAtt => {
			this.hasAtt = hasAtt;
			const usuario = this.auth.getUsuarioDetails();
			this.canEditAtt = usuario && usuario.permissoes.includes('A4');
		});

		const path = this.navService.path();
		this.link$ = this.navService.linkObservable();
		this.linkSubscription = this.link$.subscribe(link => this.link = [path].concat(link));
	}

	ngOnDestroy(): void {
		this.hasAttSubscription.unsubscribe();
		this.linkSubscription.unsubscribe();
	}

	onEmitTool(tool: number) {
		this.navService.toolbar.next(tool);
	}
}
