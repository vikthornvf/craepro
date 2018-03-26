export class Enums {

	static readonly Atts = [
		{ value: 'A', name: 'AEE' },
		{ value: 'P', name: 'Psicológico' },
		{ value: 'F', name: 'Fonoaudiológico' }
	];

	static readonly Dias = [
		{ value: 0, name: 'Domingo', short: 'Dom' },
		{ value: 1, name: 'Segunda', short: 'Seg' },
		{ value: 2, name: 'Terça', short: 'Ter' },
		{ value: 3, name: 'Quarta', short: 'Qua' },
		{ value: 4, name: 'Quinta', short: 'Qui' },
		{ value: 5, name: 'Sexta', short: 'Sex' },
		{ value: 6, name: 'Sábado', short: 'Sab' }
	];

	static readonly Series = [
		{ value: 'E3', name: '3º ano' },
		{ value: 'E2', name: '2º ano' },
		{ value: 'E1', name: '1º ano' },
		{ value: 'F9', name: '9ª série' },
		{ value: 'F8', name: '8ª série' },
		{ value: 'F7', name: '7ª série' },
		{ value: 'F6', name: '6ª série' },
		{ value: 'F5', name: '5ª série' },
		{ value: 'F4', name: '4ª série' },
		{ value: 'F3', name: '3ª série' },
		{ value: 'F2', name: '2ª série' },
		{ value: 'F1', name: '1ª série' },
		{ value: 'PB', name: 'Pré' },
		{ value: 'PA', name: 'Pré A' },
		{ value: 'B2', name: 'Berçário II' },
		{ value: 'B1', name: 'Berçário ' },
		{ value: 'M3', name: 'Maternal III' },
		{ value: 'M2', name: 'Maternal II' },
		{ value: 'M1', name: 'Maternal' }
	];

	static readonly Situacao = [
		{ value: 'A', name: 'Ativo' },
		{ value: 'P', name: 'Parcialmente Ativo' },
		{ value: 'E', name: 'Em espera' },
		{ value: 'D', name: 'Desligado' }
	];

	static readonly Turnos = [
		{ value: 'M', name: 'Manhã' },
		{ value: 'T', name: 'Tarde' },
		{ value: 'N', name: 'Noite' }
	];
}
