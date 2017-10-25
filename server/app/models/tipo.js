const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Tipo de Atendimento para os alunos ou especializacao do profissional que atende:
 * A - Atendimento Educacional Especializado
 * F - Fonoaudiologico
 * P - Psicologico
 */
const tipoSchema = new Schema({
    tipo: String
});

module.exports = tipoSchema;

// TODO estudar conceito de enums para talvez aplicar