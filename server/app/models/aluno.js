const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResponsavelSchema = require('./responsavel_shcema');

const alunoSchema = new Schema({
	nome: { type: String, required: true },
	serie: String,
	turma: String,
	turno: String,
	responsavels: [ResponsavelSchema],
	escola: {
		type: Schema.Types.ObjectId,
		ref: 'Escola'
	},
	atendimentos: [{
		type: Schema.Types.ObjectId,
		ref: 'Atendimento'
	}],
});

alunoSchema.pre('remove', function(next) {
    const Atendimento = mongoose.model('Atendimento');

    Atendimento.remove({ _id: { $in: this.atendimentos } })
        .then(() => next());
});

const Aluno = mongoose.model('Aluno', alunoSchema);
module.exports = Aluno;
