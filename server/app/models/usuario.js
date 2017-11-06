const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nome: { type: String, required: true },
    auth: { type: String, required: true }
});

const Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = Usuario;