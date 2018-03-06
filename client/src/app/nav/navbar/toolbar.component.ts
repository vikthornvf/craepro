import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

	hasAtt = false;
	hasAttObservable: Subscription;

	link: string[];
	linkObservable: Subscription;

	tool = this.navService.tools;

	constructor(private navService: NavbarService) {}

	ngOnInit(): void {
		const path = this.navService.path();
		this.hasAttObservable = this.navService.hasAtt.subscribe(hasAtt => this.hasAtt = hasAtt);
		this.linkObservable = this.navService.link.subscribe(link => this.link = [path].concat(link));
	}

	ngOnDestroy(): void {
		this.hasAttObservable.unsubscribe();
		this.linkObservable.unsubscribe();
	}

	onEmitTool(tool: number) {
		this.navService.toolbar.emit(tool);
	}
}
