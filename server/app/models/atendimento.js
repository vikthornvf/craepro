const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const atendimentoSchema = new Schema({
    encaminhamento: Date,
    inicio: Date,
    alta: Date,
    hora: String,
    dia: String,
    turno: String,
    tipo: { type: String, required: true },
    aluno: {
        type: Schema.Types.ObjectId,
        ref: 'aluno',
        required: true
    },
    professor: {
        type: Schema.Types.ObjectId,
        ref: 'professor',
        required: true
    },
});

atendimentoSchema.virtual('status').get(function() {
    if (!this.alta) {
        return this.inicio
            ? 'Ativo'
            : 'Espera';
    }
    return 'Alta';
});

atendimentoSchema.pre('save', function(next) {
    if (!this.encaminhamento) this.encaminhamento = new Date();

    const Aluno = mongoose.model('aluno');
    const Professor = mongoose.model('professor');

    Promise.all([
        Aluno.update(
            { _id: this.aluno._id },
            { $push: { atendimentos: this } }
        ),
        Professor.update(
            { _id: this.professor._id },
            { $push: { atendimentos: this } }
        )
    ])
    .then(() => next());
});

const Atendimento = mongoose.model('atendimento', atendimentoSchema);
module.exports = Atendimento;