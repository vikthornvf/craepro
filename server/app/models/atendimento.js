const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const atendimentoSchema = new Schema({
    turno: String,
    encaminhamento: Date,
    inicio: Date,
    desligamento: Date,
    aluno: {
        type: Schema.Types.ObjectId,
        ref: 'aluno'
    },
    professor: {
        type: Schema.Types.ObjectId,
        ref: 'professor'
    },
});

atendimentoSchema.virtual('status').get(function() {
    if (!this.desligamento) {
        return this.inicio
            ? 'Ativo'
            : 'Espera';
    }
    return 'Desligado';
});

atendimentoSchema.pre('save', function() {
    if (!this.encaminhamento) this.encaminhamento = new Date();
});

const Atendimento = mongoose.model('atendimento', atendimentoSchema);
module.exports = Atendimento;