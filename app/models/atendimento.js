const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HorarioSchema = require('./horario_schema');
const ParecerSchema = require('./parecer_schema');

const atendimentoSchema = new Schema({
	tipo: String,
	solicitacao: {
		type: Date,
		default: new Date(),
		required: true
	},
	inicio: Date,
	egresso: Date,
	horario: HorarioSchema,
	pareceres: [ParecerSchema],
	aluno: {
		type: Schema.Types.ObjectId,
		ref: 'Aluno',
		required: true
	},
	profissional: {
		type: Schema.Types.ObjectId,
		ref: 'Profissional'
	},
});

atendimentoSchema.post('save', (atendimento, next) => updateAlunoStatus(atendimento, next));
atendimentoSchema.post('findOneAndUpdate', (atendimento, next) => updateAlunoStatus(atendimento, next));
atendimentoSchema.post('findOneAndRemove', (atendimento, next) => updateAlunoStatus(atendimento, next));

const Atendimento = mongoose.model('Atendimento', atendimentoSchema);
module.exports = Atendimento;

function updateAlunoStatus(atendimento, next) {

	Atendimento.find({ aluno: atendimento.aluno })
		.exec((err, atendimentos) => {
			if (err) return console.log(err);

			let solicitado = false;
			let ativo = false;
			let finalizado = false;
			let situacao;

			if (atendimentos && atendimentos.length) {
				atendimentos.forEach(a => {
					if (a.egresso) {
						finalizado = true;
					} else if (a.inicio) {
						ativo = true;
					} else {
						solicitado = true;
					}
				});

				if (solicitado) {
					situacao = ativo
						? 'P' // Parcialmente ativo
						: 'E'; // Em espera
				} else if (ativo) {
					situacao = 'A'; // Ativo
				} else if (finalizado) {
					situacao = 'D'; // Desligado
				}
			} else {
				situacao = 'S'; // Sem atendimento
			}

			const Aluno = mongoose.model('Aluno');
			Aluno.findByIdAndUpdate(atendimento.aluno, { situacao }, (error, aluno) => {
				if (error) return console.log(error);
				console.log(`Updated ${aluno.nome}'s status to ${situacao}`);
				next();
			});
		});
}
