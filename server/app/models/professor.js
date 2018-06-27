const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EnderecoSchema = require('./endereco_schema');

const professorSchema = new Schema({
	nome: { type: String, required: true },
	atendimentoTipos: [{ type: String }],
	telefones: [String],
	enderecos: [EnderecoSchema],
	atendimentos: [{
		type: Schema.Types.ObjectId,
		ref: 'Atendimento'
	}]
});

professorSchema.pre('remove', function (next) {
	const Atendimento = mongoose.model('Atendimento');

	Atendimento.remove({ _id: { $in: this.atendimentos } })
		.then(() => next());
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;
