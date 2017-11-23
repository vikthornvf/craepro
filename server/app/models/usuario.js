const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
	nome: { type: String, required: true },
	email: { type: String, required: true },
	admin: {
		type: String,
		default: false,
		required: true
	},
	escola: {
		type: Schema.Types.ObjectId,
		ref: 'Escola'
	}
});

// adds { password: String } to schema
usuarioSchema.plugin(require('mongoose-bcrypt'));

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
