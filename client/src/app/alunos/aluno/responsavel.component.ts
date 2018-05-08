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
	enderecos: FormArray = this.fb.array([]);
	telefones: FormArray = this.fb.array([null]);

	constructor(
		private service: AlunoService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm();
		this.responsavel.enderecos.forEach(endereco => this.enderecos.insert(0, this.createEndereco(endereco)));
	}

	initForm(): void {
		this.form = this.fb.group({
			'nome': new FormControl(null, Validators.required),
			'parentesco': null,
			'telefones': this.telefones,
			'enderecos': this.enderecos,
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

	addTelefone(): void {
		const control = new FormControl(null, Validators.required);
		this.telefones = this.form.get('telefones') as FormArray;
		this.telefones.push(control);

		this.responsavel.telefones.push(null);
		setTimeout(() => Materialize.updateTextFields(), 200);
	}

	removeTelefone(index: number): void {
		this.responsavel.telefones.splice(index, 1);
		this.telefones.removeAt(index);
	}

	createEndereco(endereco: Endereco): FormGroup {
		return this.fb.group({
			'tipo': new FormControl(endereco.tipo, Validators.required),
			'rua': new FormControl(endereco.rua, Validators.required),
			'numero': new FormControl(endereco.numero, Validators.required),
			'complemento': endereco.complemento,
			'bairro': new FormControl(endereco.bairro, Validators.required),
			'cidade': new FormControl(endereco.cidade, Validators.required),
		});
	}

	addEndereco(): void {
		const newEndereco = new Endereco('Imbé');

		this.enderecos = this.form.get('enderecos') as FormArray;
		this.enderecos.push(this.createEndereco(newEndereco));

		this.responsavel.enderecos.push(newEndereco);
		setTimeout(() => Materialize.updateTextFields(), 200);
	}

	removeEndereco(index: number): void {
		this.responsavel.enderecos.splice(index, 1);
		this.enderecos.removeAt(index);
	}
}
