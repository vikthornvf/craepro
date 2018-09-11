const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EnderecoSchema = require('./endereco_schema');

const profissionalSchema = new Schema({
	nome: { type: String, required: true },
	atendimentoTipos: [{ type: String }],
	telefones: [String],
	enderecos: [EnderecoSchema],
	atendimentos: [{
		type: Schema.Types.ObjectId,
		ref: 'Atendimento'
	}]
});

profissionalSchema.post('findOneAndRemove', (profissional, next) => {

	// find and remove all atendimentos related
	const Atendimento = mongoose.model('Atendimento');

	Atendimento.find({ profissional: profissional._id }, (err, atendimentos) => {
		if (err) {
			return console.log(err);
		}
		if (atendimentos && atendimentos.length) {
			var promises = [];
			atendimentos.forEach((att) => {
				promises.push(Atendimento.findByIdAndRemove(att._id));
			});
			Promise.all(promises).then(() => {
				console.log(`Removed all ${profissional.nome}'s atendimentos.`);
				next();
			});
		}
	});
});

const Profissional = mongoose.model('Profissional', profissionalSchema);
module.exports = Profissional;
