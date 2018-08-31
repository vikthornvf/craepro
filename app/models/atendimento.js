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

const Atendimento = mongoose.model('Atendimento', atendimentoSchema);
module.exports = Atendimento;
