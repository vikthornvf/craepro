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
	tool = this.navService.tools;

	constructor(private navService: NavbarService) {}

	ngOnInit(): void {
		this.hasAttObservable = this.navService.hasAtt.subscribe(hasAtt => this.hasAtt = hasAtt);
	}

	ngOnDestroy(): void {
		this.hasAttObservable.unsubscribe();
	}

	onEmitTool(tool: number) {
		this.navService.emitTool(tool);
	}
}
