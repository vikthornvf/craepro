import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { EscolaService } from '../../escolas/escola.service';
import { AtendimentoService } from '../../atendimentos/atendimento.service';
import { ResponsavelService } from '../../responsaveis/responsavel.service';
import { NavService } from '../../nav/nav.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { AuthService } from '../../auth.service';
import { Aluno } from '../aluno.model';
import { Escola } from '../../escolas/escola.model';
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
	loaded: boolean;
	editNome = true;
	aluno: Aluno;
	escolas: Escola[];
	atendimentos: Atendimento[] = [];
	responsaveis: Responsavel[] = [];
	series: {}[] = Enums.Series;
	turnos: {}[] = Enums.Turnos;

	canCreateAtt: boolean;
	canEditParecer: boolean;
	canEditAtt: boolean;
	canEdit: boolean;

	constructor(
		private service: AlunoService,
		private escolaService: EscolaService,
		private atendimentoService: AtendimentoService,
		private responsavelService: ResponsavelService,
		private navService: NavService,
		private dialogs: DialogsService,
		private auth: AuthService,
		private route: ActivatedRoute,
		private _zone: NgZone) {}

	ngOnInit(): void {
		this.initForm();
		this.loadEscolas();
		this.route.params.subscribe(params => {
			const id = params['id'];
			if (id) {
				this.loadAluno(id);
				this.editNome = false;
			} else {
				this.initAluno();
			}
		});
		this.userAuth();
	}

	userAuth() {
		const auth = this.auth.getUsuarioDetails().permissoes;
		this.canCreateAtt = auth.includes('A2');
		this.canEditParecer = auth.includes('A3');
		this.canEditAtt = auth.includes('A4');
		this.canEdit = auth.includes('A5');
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
		this.loaded = true;
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

	loadAluno(id: string): void {
		this.service.findById(id).subscribe(
			aluno => {
				this.aluno = aluno;
				this.form.patchValue({
					'nome': aluno.nome,
					'serie': aluno.serie,
					'escola': aluno.escola._id,
					'turno': aluno.turno
				});
				this.loaded = true;
			},
			err => console.log(err));
		this.loadAtendimentos(id);
		this.loadResponsaveis(id);
	}

	loadEscolas(): void {
		this.escolaService.list().subscribe(
			escolas => {
				this.escolas = escolas;
				this.updateDropdownState();
			},
			err => console.log(err));
	}

	addResponsavel(): void {
		this.updateTooltipState();

		const newResponsavel = new Responsavel();
		newResponsavel.aluno = this.aluno;
		newResponsavel.telefones = [];
		newResponsavel.enderecos = [];

		this.responsaveis.unshift(newResponsavel);
	}

	loadResponsaveis(id: string): void {
		if (id) {
			this.responsavelService.listByAluno(id).subscribe(
				responsaveis => this.responsaveis = responsaveis,
				err => console.log(err));
		}
	}

	removeResponsavel(responsavel: Responsavel): void {
		this._zone.run(() => {
			const index = this.responsaveis.indexOf(responsavel);
			this.responsaveis.splice(index, 1);
		});
	}

	addAtendimento(): void {
		this.updateTooltipState();

		const newAtendimento = new Atendimento();
		newAtendimento.aluno = this.aluno;
		newAtendimento.pareceres = [];
		newAtendimento.solicitacao = new Date();

		this.atendimentos.unshift(newAtendimento);
	}

	loadAtendimentos(id: string): void {
		if (id) {
			this.atendimentoService.listByAluno(id).subscribe(
				atendimentos => this.atendimentos = atendimentos,
				err => console.log(err));
		}
	}

	removeAtendimento(atendimento: Atendimento): void {
		this._zone.run(() => {
			const index = this.atendimentos.indexOf(atendimento);
			this.atendimentos.splice(index, 1);
			this.service.updateSituacao(this.aluno, this.atendimentos);
		});
	}

	onSave(): void {
		if (this.form.invalid) {
			this.submitted = true;
			this.updateDropdownState();
			return;
		}

		const aluno = this.aluno;
		aluno.nome = this.form.get('nome').value;
		aluno.serie = this.form.get('serie').value;
		aluno.turno = this.form.get('turno').value;
		const escolaId = this.form.get('escola').value;
		aluno.escola = new Escola(escolaId);
		if (!aluno.situacao) {
			aluno.situacao = 'S';
		}

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

	updateTooltipState() {
		$(document).ready(function(){
			$('.tooltipped').tooltip();
		});
	}

	updateDropdownState() {
		$(document).ready(function() {
			$('select').material_select();
		});
	}
}
