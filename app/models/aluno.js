const mongoose = require('mongoose');
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

alunoSchema.post('findOneAndRemove', (aluno, next) => {
	const Atendimento = mongoose.model('Atendimento');
	const Responsavel = mongoose.model('Responsavel');
	Promise.all([
		Atendimento.remove({ aluno: aluno._id }, (err) => {
			if (err) return console.log(err);
			console.log(`Removed all ${aluno.nome}'s atendimentos.`);
		}),
		Responsavel.remove({ aluno: aluno._id }, (err) => {
			if (err) return console.log(err);
			console.log(`Removed all ${aluno.nome}'s responsaveis.`);
		}),
	]).then(() => next());
});

const Aluno = mongoose.model('Aluno', alunoSchema);
module.exports = Aluno;
