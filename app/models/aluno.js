const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const alunoSchema = new Schema({
	nome: { type: String, required: true },
	situacao: String,
	serie: String,
	turma: String,
	turno: String,
	escola: {
		type: Schema.Types.ObjectId,
		ref: 'Escola'
	}
});

alunoSchema.pre('remove', function (next) {
	const Atendimento = mongoose.model('Atendimento');
	const Responsavel = mongoose.model('Responsavel');

	Promise.all([
		Atendimento.remove({ aluno: { $in: this.atendimentos } }),
		Responsavel.remove({ aluno: { $in: this.atendimentos } })
	]).then(() => next());
});

const Aluno = mongoose.model('Aluno', alunoSchema);
module.exports = Aluno;
