import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DialogsService } from '../../dialogs/dialogs.service';
import { ResponsavelService } from '../responsavel.service';
import { Aluno } from '../../alunos/aluno.model';
import { Responsavel } from '../responsavel.model';

@Component({
	selector: 'app-responsavel',
	templateUrl: './responsavel.component.html'
})
export class ResponsavelComponent implements OnInit {

	@Input() index: number;
	@Input() aluno: Aluno;
	@Input() responsavel: Responsavel;
	@Output() save = new EventEmitter<Responsavel>();
	@Output() delete = new EventEmitter<string>();

	form: FormGroup;

	constructor(
		private service: ResponsavelService,
		private dialogs: DialogsService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			'nome': new FormControl(this.responsavel.nome, Validators.required),
			'parentesco': this.responsavel.parentesco
		});
	}

	onSave(): void {
		if (this.form.invalid) {
			this.dialogs.toastFail('Preencha todos os campos obrigatórios para salvar.');
			return;
		}

		this.responsavel.aluno = this.aluno;
		this.responsavel.nome = this.form.get('nome').value;
		this.responsavel.parentesco = this.form.get('parentesco').value;
		if (!this.responsavel._id) {
			this.service.onCreate(this.responsavel).subscribe(
				res => {
					this.responsavel._id = res['_id'];
					this.save.emit(this.responsavel);
					this.dialogs.toastSuccess(`Responsável ${this.responsavel.nome} criado com sucesso!`);
				},
				err => console.log(err));
		}
		else {
			this.responsavel = this.service.save(this.responsavel);
			this.save.emit(this.responsavel);
		}
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			const _id = this.responsavel._id;
			this.service.delete(_id);
			this.delete.emit(_id);
		}
	}

	onConfirmDelete(): void {
		const label = this.responsavel.nome ? this.responsavel.nome : 'Responsável';
		this.dialogs.modalDelete(confirm => this.onDelete(confirm), label);
	}
}
