import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { AlunoService } from '../aluno.service';
import { Responsavel } from '../responsavel.model';
import { Endereco } from '../../shared/endereco.model';

declare var Materialize: any;

@Component({
	selector: 'app-responsavel',
	templateUrl: './responsavel.component.html'
})
export class ResponsavelComponent implements OnInit {

	@ViewChild('deleteConfirmModal') deleteConfirmModal;

	@Input() alunoId: string;
	@Input() responsavel: Responsavel;
	@Output() delete = new EventEmitter<Responsavel>();

	form: FormGroup;

	constructor(
		private service: AlunoService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			'nome': new FormControl(null, Validators.required),
			'parentesco': null
		});
	}

	onSave(index: number): void {
		this.service.saveResponsavel(this.alunoId, this.responsavel, index);
	}

	onConfirmRemove(): void {
		const label = this.responsavel.nome
			? this.responsavel.nome
			: 'Responsável';
		this.deleteConfirmModal.open(label, confirm => this.onRemove(confirm));
	}

	onRemove(confirm: boolean): void {
		if (confirm) {
			this.delete.emit(this.responsavel);
			if (this.alunoId) {
				this.service.removeResponsavel(this.alunoId, this.responsavel);
			}
		}
	}
}
