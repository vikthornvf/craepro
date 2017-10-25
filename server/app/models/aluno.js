const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alunoSchema = new Schema({
	nome: { type: String, required: true },
	escola: {
		type: Schema.Types.ObjectId,
		ref: 'escola'
	},
	atendimentos: {
		type: Schema.Types.ObjectId,
		ref: 'atendimento'
	},
});

const Aluno = mongoose.model('Aluno', alunoSchema);
module.exports = Aluno;