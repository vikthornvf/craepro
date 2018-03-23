import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { EscolaService } from '../../escolas/escola.service';
import { AtendimentoService } from '../../atendimentos/atendimento.service';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { Aluno } from '../aluno.model';
import { Escola } from '../../escolas/escola.model';
import { Professor } from '../../professores/professor.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { ToastService } from '../../shared/toast.service';
import { Enums } from '../../shared/enums';

declare var $;

@Component({
	selector: 'app-aluno',
	templateUrl: './aluno.component.html',
	styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

	@ViewChild('deleteConfirmModal') deleteConfirmModal;

	form: FormGroup;
	submitted = false;

	editNome = true;
	loading = false;
	loadingAtendimentos = false;

	aluno: Aluno;
	escolas: Escola[];
	atendimentos: Atendimento[];
	series: {}[] = Enums.Series;
	turnos: {}[] = Enums.Turnos;

	constructor(
		private service: AlunoService,
		private escolaService: EscolaService,
		private atendimentoService: AtendimentoService,
		private navService: NavbarService,
		private _route: ActivatedRoute) { }

	ngOnInit() {
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
			'atendimentos': new FormArray([]),
			'responsaveis': new FormArray([])
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
			if (this.form.get('nome').value) {
				this.toggleEditNome();
			}
		}
	}

	wasTouched(control: string) {
		this.form.get(control).setErrors({ 'wasTouched': true });
		console.log(this.form.get(control).errors.wasTouched);
	}

	loadAluno(_id: string) {
		this.loading = true; // TODO resolve async
		const a = this.aluno = this.service.findById(_id);
		this.form.patchValue({
			'nome': a.nome,
			'escola': a.escola._id,
			'serie': a.serie,
			'turno': a.turno
		});
		this.loadAtendimentos();
		this.loading = false;
	}

	loadEscolas() {
		this.escolas = this.escolaService.list();
	}

	loadAtendimentos() {
		const _id = this.aluno._id;
		this.loadingAtendimentos = true; // TODO resolve async
		this.atendimentos = this.atendimentoService.listByAluno(_id);
		this.loadingAtendimentos = false;
	}

	onSave() {
		if (this.form.invalid) {
			this.submitted = true;
			// update dropdown state
			$(document).ready(function() {
				$('select').material_select();
			});
			return;
		}
		console.log(this.form.get('serie'));
		const value = this.form.value;
		// this.form.reset(value);
		// TODO
		this.service.save(this.aluno);
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

	cancel() {
		this.navService.onNavigateBack();
	}
}
