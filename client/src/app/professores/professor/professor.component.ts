import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { ProfessorService } from '../professor.service';
import { AtendimentoService } from '../../atendimentos/atendimento.service';
import { Professor } from '../professor.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { Endereco } from '../../shared/endereco.model';
import { DialogsService } from '../../dialogs/dialogs.service';

declare var Materialize: any;

@Component({
	selector: 'app-professor',
	templateUrl: './professor.component.html'
})
export class ProfessorComponent implements OnInit {

	form: FormGroup;
	submitted: boolean;

	professor: Professor;
	atendimentos: Atendimento[];

	@ViewChild('deleteConfirmModal') deleteConfirmModal;

	constructor(
		private dialogs: DialogsService,
		private service: ProfessorService,
		private atendimentoService: AtendimentoService,
		private navService: NavbarService,
		private _route: ActivatedRoute,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm();
		this._route.params.subscribe(params => {
			const id = params['id'];
			if (id) {
				this.loadProfessor(id);
			} else {
				this.initProfessor();
			}
		});
	}

	initForm(): void {
		this.form = this.fb.group({
			'nome': this.fb.control(null, Validators.required),
			'hasAee': null,
			'hasFono': null,
			'hasPsico': null
		});
	}

	loadProfessor(id: string): void {
		const professor = this.service.findById(id);
		this.professor = professor;
		this.form.patchValue({
			'nome': professor.nome,
			'hasAee': professor.atendimentoTipos.includes('A'),
			'hasFono': professor.atendimentoTipos.includes('F'),
			'hasPsico': professor.atendimentoTipos.includes('P'),
		});
		this.loadAtendimentos();
	}

	initProfessor(): void {
		this.professor = new Professor();
		this.professor.telefones = [];
		this.professor.enderecos = [];
		this.professor.atendimentoTipos = [];
	}

	loadAtendimentos(): void {
		// TODO
	}

	onSave(): void {
		if (this.form.invalid) {
			this.submitted = true;
			return;
		}

		const professor = this.professor;
		professor.nome = this.form.get('nome').value;
		professor.atendimentoTipos = this.buildAtendimentoTiposArray();

		this.professor = this.service.save(professor);
		this.submitted = false;
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			this.service.delete(this.professor._id);
			this.navService.onNavigateBack();
		}
	}

	onConfirmDelete(): void {
		const label = this.professor.nome ? this.professor.nome : 'Professor';
		this.dialogs.modalDelete(confirm => this.onDelete(confirm), label);
	}

	cancel(): void {
		this.navService.onNavigateBack();
	}

	buildAtendimentoTiposArray(): string[] {
		const str = [];
		if (this.form.get('hasAee').value) {
			str.push('A');
		}
		if (this.form.get('hasFono').value) {
			str.push('F');
		}
		if (this.form.get('hasPsico').value) {
			str.push('P');
		}
		return str;
	}
}
