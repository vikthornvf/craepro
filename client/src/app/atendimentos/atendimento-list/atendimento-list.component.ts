import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { AtendimentoService } from '../atendimento.service';
import { Atendimento } from '../atendimento.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-atendimento-list',
	templateUrl: './atendimento-list.component.html'
})
export class AtendimentoListComponent implements OnInit, OnDestroy, OnChanges {

	@Input() property: string;
	@Input() selectedId: string;
	@Input() editLink: string;
	@Output() select: EventEmitter<any> = new EventEmitter();

	atendimentos: Atendimento[] = [];
	atendimentoId: string;
	isAtendimentosLoaded = false;

	toolbarObservable: Subscription;

	timer;
	preventSimpleClick = false;
	delay = 200;

	constructor(
		private navService: NavbarService,
		private service: AtendimentoService) {}

	ngOnInit(): void {
		this.toolbarObservable = this.navService.toolbar.subscribe(code => this.toolbarFunctions(code));
	}

	ngOnDestroy(): void {
		this.navService.changeHasAtt(false);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.selectedId.previousValue !== changes.selectedId.currentValue) {
			this.loadAtendimentos();
		}
	}

	toolbarFunctions(code: number) {
		const tools = this.navService.tools;
		switch (code) {
			case tools.SELECTION: {
				this.atendimentoId = null;
				break;
			}
			case tools.EDIT_ATT: {
				console.log('EDIT ATENDIMENTO');
				// TODO
				break;
			}
			case tools.DELETE_ATT: {
				console.log('DELETE ATENDIMENTO');
				// TODO
				break;
			}
		}
	}

	onLoad(): void {
		this.atendimentos = [];
		this.isAtendimentosLoaded = false;
	}

	loaded(): void {
		this.isAtendimentosLoaded = true;
	}

	loadAtendimentos(): void {
		this.onLoad();
		setTimeout(() => {
			if (this.property === 'profissional') {
				this.atendimentos = this.service.listByAluno(this.selectedId);
			} else
			if (this.property === 'aluno') {
				this.atendimentos = this.service.listByProfessor(this.selectedId);
			}
			this.loaded();
		}, 500);
	}

	onClick(id: string): void {
		this.preventSimpleClick = false;
		this.timer = setTimeout(() => {
			if (!this.preventSimpleClick) {
				this.onSelect(id);
			}
		}, this.delay);
	}

	onDoubleClick(id: string): void {
		this.preventSimpleClick = true;
		clearTimeout(this.timer);
		if (this.atendimentoId !== id) {
			this.onSelect(id);
		}
	}

	onPress(id: string): void {
		if (this.atendimentoId !== id) {
			this.onSelect(id);
		}
	}

	onSelect(id: string): void {
		if (this.atendimentoId !== id) {
			this.atendimentoId = id;
			this.select.emit();
		} else {
			this.atendimentoId = null;
		}
		this.navService.changeHasAtt(!!this.atendimentoId);
	}

	onSaveAtendimento(): void {
		// TODO
		// if (this.atendimentoId) save
		// else create;
		console.log('save');
	}
}
