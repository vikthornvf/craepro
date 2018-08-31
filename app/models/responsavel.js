const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EnderecoSchema = require('./endereco_schema');

const responsavelSchema = new Schema({
	nome: { type: String, required: true },
	parentesco: String,
	telefones: [String],
	enderecos: [EnderecoSchema],
	aluno: {
		type: Schema.Types.ObjectId,
		ref: 'Aluno',
		required: true
	}
});

const Responsavel = mongoose.model('Responsavel', responsavelSchema);
// module.exports = Responsavel;
