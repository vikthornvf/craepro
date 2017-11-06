const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EnderecoSchema = require('./endereco');

const professorSchema = new Schema({
	nome: { type: String, required: true },
	tipoAtendimentos: [{ type: String }],
	telefones: [{ type: String }],
	enderecos: [EnderecoSchema],
	atendimentos: [{
		type: Schema.Types.ObjectId,
		ref: 'atendimento'
	}]
});

professorSchema.pre('remove', function(next) {
    const Atendimento = mongoose.model('atendimento');

    Atendimento.remove({ _id: { $in: this.atendimentos } })
        .then(() => next());
});

const Professor = mongoose.model('professor', professorSchema);
module.exports = Professor;