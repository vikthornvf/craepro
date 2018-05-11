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
import { Responsavel } from '../responsavel.model';

declare var $;

@Component({
	selector: 'app-aluno',
	templateUrl: './aluno.component.html'
})
export class AlunoComponent implements OnInit {

	@ViewChild('deleteConfirmModal') deleteConfirmModal;

	form: FormGroup;
	submitted = false;
	editNome = true;
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
		private _route: ActivatedRoute) {}

	ngOnInit(): void {
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

	initForm(): void {
		this.form = new FormGroup({
			'nome': new FormControl(null, Validators.required),
			'escola': new FormControl(null, Validators.required),
			'serie': new FormControl(null, Validators.required),
			'turno': new FormControl(null, Validators.required),
			'atendimentos': new FormArray([]),
			'responsaveis': new FormArray([])
		});
	}

	initAluno(): void {
		this.aluno = new Aluno();
		this.aluno.escola = new Escola();
		this.aluno.responsaveis = [];
	}

	toggleEditNome(): void {
		this.editNome = !this.editNome;
	}

	onEdtitNome(key: string): void {
		if (key === 'Enter' || key === 'Escape') {
			if (this.form.get('nome').value) {
				this.toggleEditNome();
			}
		}
	}

	loadAluno(_id: string): void {
		const a = this.aluno = this.service.findById(_id);
		this.form.patchValue({
			'nome': a.nome,
			'escola': a.escola._id,
			'serie': a.serie,
			'turno': a.turno
		});
		this.loadAtendimentos();
	}

	loadEscolas(): void {
		this.escolas = this.escolaService.list();
	}

	addResponsavel(): void {
		$('#buttonCreateResponsavel').tooltip('remove');

		if (!this.aluno.responsaveis) {
			this.aluno.responsaveis = [];
		}

		const newResponsavel = new Responsavel();
		newResponsavel.telefones = [];
		newResponsavel.enderecos = [];
		this.aluno.responsaveis.unshift(newResponsavel);
	}

	onRemoveReponsavel(responsavel: Responsavel): void {
		const responsaveis = this.aluno.responsaveis.filter((r) => r !== responsavel);
		this.aluno.responsaveis = responsaveis;
	}

	addAtendimento(): void {
		$('#buttonCreateAtt').tooltip('remove');

		const newAtendimento = new Atendimento();
		newAtendimento.aluno = this.aluno;
		newAtendimento.pareceres = [];
		newAtendimento.solicitacao = new Date();

		if (!this.atendimentos) {
			this.atendimentos = [];
		}
		this.atendimentos.unshift(newAtendimento);
	}

	loadAtendimentos(): void {
		const _id = this.aluno._id;
		this.atendimentos = this.atendimentoService.listByAluno(_id);
	}

	onSave(): void {
		if (this.form.invalid) {
			this.submitted = true;
			// update dropdown state
			$(document).ready(function() {
				$('select').material_select();
			});
			return;
		}

		const aluno = this.aluno;
		aluno.nome = this.form.get('nome').value;
		aluno.serie = this.form.get('serie').value;
		aluno.turno = this.form.get('turno').value;
		const escolaId = this.form.get('escola').value;
		aluno.escola = this.escolaService.findById(escolaId);

		this.service.save(aluno);
		this.submitted = false;
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			this.service.delete(this.aluno._id);
			this.navService.onNavigateBack();
		}
	}

	onConfirmDelete(): void {
		this.deleteConfirmModal.open();
	}

	cancel(): void {
		this.navService.onNavigateBack();
	}
}
