import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../nav.service';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

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
