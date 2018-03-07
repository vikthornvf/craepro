import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from './navbar.service';
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

	link: string[];
	linkSubscription: Subscription;
	link$: Observable<string[]>;

	tool = this.navService.tools;

	constructor(private navService: NavbarService) {}

	ngOnInit(): void {
		this.hasAttSubscription = this.navService.hasAtt.subscribe(hasAtt => this.hasAtt = hasAtt);

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
