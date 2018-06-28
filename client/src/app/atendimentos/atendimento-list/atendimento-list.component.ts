import { Component, Input, Output, ViewChild, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { AtendimentoService } from '../atendimento.service';
import { DialogsService } from '../../dialogs/dialogs.service';
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
	@Output() situacao: EventEmitter<Atendimento[]> = new EventEmitter();
	@Output() closeModal: EventEmitter<boolean> = new EventEmitter();
	@ViewChild('atendimentoModal') modal;

	atendimentos: Atendimento[] = [];
	atendimentoSelected: Atendimento;
	isAtendimentosLoaded = false;

	toolbarObservable: Subscription;

	timer;
	preventSimpleClick = false;
	delay = 200;

	constructor(
		private navService: NavbarService,
		private service: AtendimentoService,
		private dialogs: DialogsService,
		private _zone: NgZone) {}

	ngOnInit(): void {
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
		if (this.property === 'profissional') {
			this.service.listByAluno(this.selectedId).subscribe(
				atendimentos => {
					this.atendimentos = atendimentos;
					this.loaded();
				},
				err => console.log(err));
		} else if (this.property === 'aluno') {
			this.service.listByProfessor(this.selectedId).subscribe(
				atendimentos => {
					this.atendimentos = atendimentos;
					this.loaded();
				},
				err => console.log(err));
		}
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
			this._zone.run(() => {
				this.atendimentos = this.atendimentos.filter(a => a !== this.atendimentoSelected);
				this.onEmitSituacao();
				this.service.delete(this.atendimentoSelected._id);
				this.onSelect(null);
			});
		}
	}

	onConfirmDelete() {
		this.dialogs.modalDelete(confirm => this.onDeleteSelected(confirm), 'Atendimento');
	}

	onCreate() {
		this.modal.openCreate();
	}

	onCloseModal() {
		this.closeModal.emit(true);
	}

	onEmitSituacao() {
		this.situacao.emit(this.atendimentos);
	}
}
