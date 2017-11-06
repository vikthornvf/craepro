const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResponsavelSchema = require('./responsavel');

const alunoSchema = new Schema({
	nome: { type: String, required: true },
	serie: String,
	turma: String,
	turno: String,
	responsavels: [ResponsavelSchema],
	escola: {
		type: Schema.Types.ObjectId,
		ref: 'escola'
	},
	atendimentos: [{
		type: Schema.Types.ObjectId,
		ref: 'atendimento'
	}],
});

alunoSchema.pre('remove', function(next) {
    const Atendimento = mongoose.model('atendimento');

    Atendimento.remove({ _id: { $in: this.atendimentos } })
        .then(() => next());
});

const Aluno = mongoose.model('aluno', alunoSchema);
module.exports = Aluno;