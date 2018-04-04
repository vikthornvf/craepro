import { Component, Input, Output, ViewChild, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
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
	@Output() select: EventEmitter<any> = new EventEmitter();
	@ViewChild('atendimentoModal') modal;
	@ViewChild('deleteConfirmModal') deleteConfirmModal;

	atendimentos: Atendimento[] = [];
	atendimentoSelected: Atendimento;
	isAtendimentosLoaded = false;
	showAluno: boolean;

	toolbarObservable: Subscription;

	timer;
	preventSimpleClick = false;
	delay = 200;

	constructor(
		private navService: NavbarService,
		private service: AtendimentoService) {}

	ngOnInit(): void {
		this.showAluno = this.property === 'profissional';
		this.toolbarObservable = this.navService.toolbar.subscribe(code => this.toolbarFunctions(code));
	}

	ngOnDestroy(): void {
		this.navService.hasAtt.next(false);
		this.toolbarObservable.unsubscribe();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.selectedId.previousValue !== changes.selectedId.currentValue) {
			this.loadAtendimentos();
		}
	}

	toolbarFunctions(code: number) {
		if (code < 0) {
			return;
		}
		const tools = this.navService.tools;
		switch (code) {
			case tools.SELECTION: {
				this.atendimentoSelected = null;
				break;
			}
			case tools.EDIT_ATT: {
				this.modal.open(this.atendimentoSelected);
				break;
			}
			case tools.DELETE_ATT: {
				this.onConfirmDelete();
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

	onClick(atendimento: Atendimento): void {
		this.preventSimpleClick = false;
		this.timer = setTimeout(() => {
			if (!this.preventSimpleClick) {
				this.onSelect(atendimento);
			}
		}, this.delay);
	}

	onDoubleClick(atendimento: Atendimento): void {
		this.preventSimpleClick = true;
		clearTimeout(this.timer);
		if (this.atendimentoSelected !== atendimento) {
			this.onSelect(atendimento);
		}
	}

	onPress(atendimento: Atendimento): void {
		if (this.atendimentoSelected !== atendimento) {
			this.onSelect(atendimento);
		}
	}

	onSelect(atendimento: Atendimento): void {
		if (this.atendimentoSelected !== atendimento) {
			this.atendimentoSelected = atendimento;
			this.select.emit();
		} else {
			this.atendimentoSelected = null;
		}
		this.navService.hasAtt.next(!!this.atendimentoSelected);
	}

	onDeselect() {
		this.atendimentoSelected = null;
	}

	onDeleteSelected(confirm: boolean) {
		if (confirm) {
			this.service.delete(this.atendimentoSelected._id);
			this.atendimentos = this.atendimentos.filter(a => a !== this.atendimentoSelected);
			this.onSelect(null);
		}
	}

	onConfirmDelete() {
		this.deleteConfirmModal.open();
	}

	onCreate() {
		this.modal.openCreate();
	}
}
