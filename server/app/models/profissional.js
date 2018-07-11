const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EnderecoSchema = require('./endereco_schema');

const profissionalSchema = new Schema({
	nome: { type: String, required: true },
	atendimentoTipos: [{ type: String }],
	telefones: [String],
	enderecos: [EnderecoSchema],
	atendimentos: [{
		type: Schema.Types.ObjectId,
		ref: 'Atendimento'
	}]
});

profissionalSchema.pre('remove', function (next) {
	const Atendimento = mongoose.model('Atendimento');

	Atendimento.remove({ _id: { $in: this.atendimentos } })
		.then(() => next());
});

const Profissional = mongoose.model('Profissional', profissionalSchema);
module.exports = Profissional;
