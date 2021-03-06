import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MaterializeAction } from 'angular2-materialize';

import { AlunoService } from '../../alunos/aluno.service';
import { AtendimentoService } from '../atendimento.service';
import { AuthService } from '../../auth.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { ProfissionalService } from '../../profissionais/profissional.service';
import { Aluno } from '../../alunos/aluno.model';
import { Atendimento } from '../atendimento.model';
import { Horario } from '../horario.model';
import { Parecer } from '../parecer.model';
import { Profissional } from '../../profissionais/profissional.model';
import { Enums } from '../../shared/enums';

declare var $;

@Component({
	selector: 'app-atendimento',
	templateUrl: './atendimento.component.html'
})
export class AtendimentoComponent implements OnChanges, OnInit {

	@Input() create = false;
	@Input() innerAlunoComponent = false;
	@Input() selectedId: string;
	@Input() atendimento: Atendimento;
	@Output() save = new EventEmitter<Atendimento>();
	@Output() delete = new EventEmitter<string>();

	att: Atendimento;
	allProfissioais: Profissional[] = [];
	profissionais: Profissional[] = [];
	profissional: Profissional;
	aluno: Aluno;
	pareceres: FormArray = this.fb.array([]);
	showPareceres = false;
	submitted = false;

	canRequest: boolean;
	canEdit: boolean;
	canEditParecer: boolean;

	form: FormGroup;
	tipos: {}[] = Enums.Atts;
	dias: {}[] = Enums.Dias;

	nomeTimeout;
	nomeActions = new EventEmitter<string|MaterializeAction>();
	nomeParams = [{
		belowOrigin: true,
		hover: false
	}];
	horarioActions = new EventEmitter<string|MaterializeAction>();
	timepickerParams = [{
		twelvehour: false,
		cleartext: 'Limpar',
		canceltext: 'Cancelar',
		container: 'body'
	}];
	datepickerParams = [{
		monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
		format: 'dd/mm/yyyy',
		today: 'Hoje',
		clear: 'Limpar',
		container: 'body'
	}];

	constructor(
		private dialogs: DialogsService,
		private service: AtendimentoService,
		private profissionalService: ProfissionalService,
		private alunoService: AlunoService,
		private auth: AuthService,
		private fb: FormBuilder) {}

	ngOnInit(): void {
		this.onInit();
	}

	ngOnChanges(changes: SimpleChanges) {
		const ca = changes.atendimento;
		if (ca && ca.currentValue !== ca.previousValue) {
			this.atendimento = ca.currentValue;
			this.profissional = this.atendimento ? this.atendimento.profissional : null;
			this.onInit();
		}
	}

	onInit() {
		if (this.create) {
			this.att = new Atendimento();
			this.att.solicitacao = new Date();
			this.att.pareceres = [];
			this.loadParent();
		} else {
			this.att = Object.assign({}, this.atendimento);
			this.aluno = this.att.aluno;
			this.profissional = this.att.profissional;
			if (this.att.inicio) {
				this.loadProfissioais();
			}
		}
		this.initForm();
		this.onChanges();
		this.userAuth();
	}

	onChanges(): void {
		this.form.get('horario.dia').valueChanges.subscribe(dia => {
			this.onSelectDiaSemana(dia);
		});
	}

	userAuth() {
		const auth = this.auth.getUsuarioDetails().permissoes;
		this.canRequest = auth.includes('A2');
		this.canEditParecer = auth.includes('A3');
		this.canEdit = auth.includes('A4');
		if (!this.canEdit && !this.canEditParecer && !this.canRequest) {
			return;
		}
		if (!this.canEdit) {
			const tipo = this.form.get('tipo');
			if (tipo.value) {
				tipo.disable();
				this.form.get('nome').disable();
				this.form.get('horario').disable();
			}
		}
		if (!this.canEditParecer) {
			this.form.get('pareceres').disable();
		}
	}

	initForm(): void {
		this.form = this.fb.group({
			'tipo': null,
			'nome': this.fb.control(null, this.validateIfHasInicio.bind(this)),
			'horario': this.fb.group({
				'dia': this.fb.control(null, this.validateIfHasInicio.bind(this)),
				'hora': this.fb.control(null, this.validateIfHasInicio.bind(this)),
			}),
			'pareceres': this.pareceres
		}, );

		const a = this.att;
		if (a) {
			this.form.patchValue({
				'nome': this.profissional ? this.profissional.nome : null,
				'autoComplete': null,
				'tipo': a.tipo,
				'horario': a.horario ? a.horario : new Horario()
			});
			this.pareceres = this.form.get('pareceres') as FormArray;
			if (a.pareceres) {
				a.pareceres.forEach(parecer => this.pareceres.insert(0, this.createParecer(parecer)));
			}
		}
	}

	onShowDropdown(key: string): void {
		if (key === 'Enter') {
			this.selectProfissional();
		}
		clearTimeout(this.nomeTimeout);
		this.nomeTimeout = setTimeout(() => {
			this.filterProfissioais();
		}, 350);
		$('#nome_att').dropdown('open');
	}

	selectProfissional(profissional?: Profissional): void {
		if (this.profissionais && this.profissionais.length === 1) {
			profissional = this.profissionais[0];
		}
		if (profissional) {
			this.profissional = profissional;
			this.profissionais = null;
			this.form.patchValue({ nome: profissional.nome });
			$('#nome_att').dropdown('close');
		}
	}

	onSelectDiaSemana(dia: number): void {
		const inicio = new Date();
		inicio.setDate(inicio.getDate() + (((dia - 1) - inicio.getDay()) + 7) % 7 + 1);
		this.att.inicio = inicio;
	}

	createParecer(parecer?: Parecer): FormGroup {
		return this.fb.group({
			'texto': parecer ? parecer.texto : null,
			'usuario': parecer ? parecer.usuario : null,
			'data': parecer ? parecer.data : null
		});
	}

	addParecer(): void {
		const usuario = this.auth.getUsuarioDetails();
		const parecer = new Parecer(new Date(), usuario.nome);
		this.pareceres = this.form.get('pareceres') as FormArray;
		this.pareceres.insert(0, this.createParecer(parecer));

		this.showPareceres = true;
	}

	removeParecer(i: number): void {
		this.dialogs.modalDelete(confirm => this.onRemoveParecer(i, confirm), 'parecer');
	}

	onRemoveParecer(i: number, confirm: boolean) {
		if (confirm) {
			this.pareceres.removeAt(i);
			this.showPareceres = true;
		}
	}

	toggleShowParecer(): void {
		this.showPareceres = !this.showPareceres;
	}

	loadParent(): void {
		this.alunoService.findById(this.selectedId).subscribe(
			aluno => this.aluno = aluno,
			err => console.log(err));
	}

	loadProfissioais(): void {
		this.profissionalService.list()
			.subscribe(
				profissionais => this.allProfissioais = profissionais,
				err => console.log(err)
			);
	}

	filterProfissioais(): void {
		const nome = this.form.get('nome').value;
		const tipo = this.form.get('tipo').value;
		this.profissionais = this.profissionalService.listByNomeAndTipoAtendimento(this.allProfissioais, nome, tipo);
	}

	iniciarAtendimento(): void {
		this.att.inicio = new Date();
		if (!this.profissionais.length) {
			this.loadProfissioais();
		}
	}

	finalizarAtendimento(): void {
		if (this.form.invalid) {
			this.submitted = true;
			this.updateDropdownState();
			this.dialogs.toastFail('Preencha todos os campos obrigatórios para encerrar.');
			return;
		}
		this.att.egresso = new Date();
		this.updateDynamicValidators();
	}

	continuarAtendimento(): void {
		this.att.egresso = null;
		this.updateDynamicValidators();
	}

	onSave(): void {
		if (this.form.invalid) {
			this.submitted = true;
			this.updateDropdownState();
			this.dialogs.toastFail('Preencha todos os campos obrigatórios para salvar.');
			return;
		}

		const att = this.att;

		att.aluno = this.aluno;
		att.profissional = this.profissional;
		att.tipo = this.form.get('tipo').value;
		att.horario = this.form.get('horario').value;
		att.pareceres = this.form.get('pareceres').value;
		att.pareceres.reverse();
		att.horario = att.horario ? att.horario : new Horario();

		if (!att._id) {
			this.service.onCreate(att)
				.subscribe(
					res => {
						att._id = res['_id'];
						this.att = this.atendimento = att;
						this.save.emit(this.atendimento);
						this.dialogs.toastSuccess('Atendimento criado com sucesso!');
						this.create = false;
					},
					err => console.log(err)
				);
		}
		else {
			this.att = this.atendimento = this.service.save(att);
			this.save.emit(this.atendimento);
		}
	}

	onDelete(confirm: boolean): void {
		if (confirm) {
			const att = this.atendimento;
			this.service.delete(att._id);
			this.delete.emit(att._id);
		}
	}

	onConfirmDelete(): void {
		this.dialogs.modalDelete(confirm => this.onDelete(confirm), 'atendimento');
	}

	updateDynamicValidators(): void {
		this.form.get('nome').updateValueAndValidity();
		this.form.get('horario.dia').updateValueAndValidity();
		this.form.get('horario.hora').updateValueAndValidity();
	}

	validateIfHasInicio(control: FormControl): {[s: string]: boolean} {
		if (this.att.inicio && !this.att.egresso) {
			if (control.value === null) {
				return {'required': true};
			}
		}
		return null;
	}

	updateDropdownState() {
		$(document).ready(function() {
			$('select').material_select();
		});
	}
}
