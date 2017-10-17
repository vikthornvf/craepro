const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	nome: {
		type: String,
		required: true
	}
});

const Aluno = mongoose.model('Aluno', schema);

module.exports = Aluno;