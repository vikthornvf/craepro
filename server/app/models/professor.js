const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TelefoneSchema = require('./telefone_schema');

const professorSchema = new Schema({
	nome: { type: String, required: true },
	tipoAtendimentos: [{ type: String }],
	telefones: [TelefoneSchema],
	atendimentos: [{
		type: Schema.Types.ObjectId,
		ref: 'Atendimento'
	}]
});

professorSchema.pre('remove', function(next) {
    const Atendimento = mongoose.model('Atendimento');

    Atendimento.remove({ _id: { $in: this.atendimentos } })
        .then(() => next());
});

const Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;
