import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { EscolaService } from '../../escolas/escola.service';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { Aluno } from '../aluno.model';
import { Escola } from '../../escolas/escola.model';
import { Professor } from '../../professores/professor.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { ToastService } from '../../shared/toast.service';
import { Enums } from '../../shared/enums';

@Component({
	selector: 'app-aluno',
	templateUrl: './aluno.component.html',
})
export class AlunoComponent implements OnInit {

	@ViewChild('deleteConfirmModal') deleteConfirmModal;

	form: FormGroup;

	editNome = true;
	loading = false;
	loadingAtendimentos = false;

	aluno: Aluno;
	atendimentos: Atendimento[];
	escolas: Escola[];
	series;
	turnos;

	constructor(
		private service: AlunoService,
		private escolaService: EscolaService,
		private navService: NavbarService,
		private _route: ActivatedRoute) { }

	ngOnInit() {
		this.series = Enums.Series;
		this.turnos = Enums.Turnos;

		this.initForm();
		this.loadEscolas();
		this._route.params.subscribe(params => {
			const id = params['id'];
			if (id) {
				this.loadAluno(id);
				this.editNome = false;
			} else {
				this.initAluno();
			}
		});
	}

	initForm() {
		this.form = new FormGroup({
			'nome': new FormControl(null, Validators.required),
			'escola': new FormControl(null, Validators.required),
			'serie': new FormControl(null, Validators.required),
			'turno': new FormControl(null, Validators.required),
			'atendimentos': new FormArray([])
		});
	}

	initAluno() {
		this.aluno = new Aluno();
		this.aluno.escola = new Escola();
	}

	toggleEditNome() {
		this.editNome = !this.editNome;
	}

	onEdtitNome(key: string) {
		if (key === 'Enter' || key === 'Escape') {
			if (this.aluno.nome) {
				this.toggleEditNome();
			}
		}
	}

	setFormValues() {
		const a = this.aluno;
		this.form.patchValue({
			'nome': a.nome,
			'escola': a.escola._id,
			'serie': a.serie,
			'turno': a.turno
			// TODO load atendimentos
		});
	}

	wasTouched(control: string) {
		this.form.get(control).setErrors({ 'wasTouched': true });
		console.log(this.form.get(control).errors.wasTouched);
	}

	loadAluno(_id: string) {
		this.loading = true; // TODO resolve async
		this.aluno = this.service.findById(_id);
		this.setFormValues();
		this.loading = false;
	}

	loadEscolas() {
		this.escolas = this.escolaService.list();
	}

	loadAtendimentos(_id: string) {
		// TODO
	}

	onSave() {
		// TODO
		console.log(this.form.get('serie'));
		const value = this.form.value;
		// this.form.reset(value);
		ToastService.toastSuccess(`Aluno ${value.nome} salvo com sucesso!`);
	}

	onDelete(confirm: boolean) {
		if (confirm) {
			this.service.delete(this.aluno._id);
			this.navService.onNavigateBack();
		}
	}

	onConfirmDelete() {
		this.deleteConfirmModal.open();
	}
}
