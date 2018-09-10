const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
	nome: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true
	},
	tipo: {
		type: String,
		required: true
	},
	escola: {
		type: Schema.Types.ObjectId,
		ref: 'Escola'
	},
	permissoes: {
		type: [String],
		required: true,
		uppercase: true
	},
	solicitado: {
		type: Boolean,
		default: true,
		required: true
	},
	hash: String,
	salt: String
});

usuarioSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

usuarioSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

usuarioSchema.methods.generateJwt = function() {
  var expiracao = new Date();
  expiracao.setDate(expiracao.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    nome: this.nome,
		email: this.email,
		tipo: this.tipo,
		escola: this.escola,
		permissoes: this.permissoes,
		solicitado: this.solicitado,
    exp: parseInt(expiracao.getTime() / 1000),
  }, process.env.SECRET);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
