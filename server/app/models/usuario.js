const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: String,
    senha: String,
    auth: String
});

const Aluno = mongoose.model('Usuario', schema);
module.exports = Aluno;