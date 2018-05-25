import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { EscolaService } from '../../escolas/escola.service';
import { AtendimentoService } from '../../atendimentos/atendimento.service';
import { ResponsavelService } from '../../responsaveis/responsavel.service';
import { NavbarService } from '../../nav/navbar/navbar.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { Aluno } from '../aluno.model';
import { Escola } from '../../escolas/escola.model';
import { Professor } from '../../professores/professor.model';
import { Atendimento } from '../../atendimentos/atendimento.model';
import { Responsavel } from '../../responsaveis/responsavel.model';
import { Enums } from '../../shared/enums';

declare var $;

@Component({
	selector: 'app-aluno',
	templateUrl: './aluno.component.html'
})
export class AlunoComponent implements OnInit {

	form: FormGroup;
	submitted = false;
	editNome = true;
	aluno: Aluno;
	escolas: Escola[];
	atendimentos: Atendimento[] = [];
	responsaveis: Responsavel[] = [];
	series: {}[] = Enums.Series;
	turnos: {}[] = Enums.Turnos;

	constructor(
		private service: AlunoService,
		private escolaService: EscolaService,
		private atendimentoService: AtendimentoService,
		private responsavelService: ResponsavelService,
		private navService: NavbarService,
		private dialogs: DialogsService,
		private _zone: NgZone,
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
		this.loadResponsaveis();
	}

	loadEscolas(): void {
		this.escolas = this.escolaService.list();
	}

	addResponsavel(): void {
		$('#buttonCreateResponsavel').tooltip('remove');

		const newResponsavel = new Responsavel();
		newResponsavel.aluno = this.aluno;
		newResponsavel.telefones = [];
		newResponsavel.enderecos = [];

		this.responsaveis.unshift(newResponsavel);
	}

	loadResponsaveis(): void {
		const _id = this.aluno._id;
		this.responsaveis = this.responsavelService.listByAluno(_id);
	}

	removeResponsavel(responsavel: Responsavel): void {
		this._zone.run(() => {
			const index = this.responsaveis.indexOf(responsavel);
			this.responsaveis.splice(index, 1);
		});
	}

	addAtendimento(): void {
		$('#buttonCreateAtt').tooltip('remove');

		const newAtendimento = new Atendimento();
		newAtendimento.aluno = this.aluno;
		newAtendimento.pareceres = [];
		newAtendimento.solicitacao = new Date();

		this.atendimentos.unshift(newAtendimento);
	}

	loadAtendimentos(): void {
		const _id = this.aluno._id;
		this.atendimentos = this.atendimentoService.listByAluno(_id);
	}

	removeAtendimento(atendimento: Atendimento): void {
		this._zone.run(() => {
			const index = this.atendimentos.indexOf(atendimento);
			this.atendimentos.splice(index, 1);
		});
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

		this.aluno = this.service.save(aluno);
		this.submitted = false;
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			this.service.delete(this.aluno._id);
			this.navService.onNavigateBack();
		}
	}

	onConfirmDelete(): void {
		const label = this.aluno.nome ? this.aluno.nome : 'Aluno';
		this.dialogs.modalDelete(confirm => this.onDelete(confirm), label);
	}
}
