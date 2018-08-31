const assert = require('assert');
const Aluno = require('../app/models/aluno');
const Atendimento = require('../app/models/atendimento');
const Professor = require('../app/models/professor');
const Escola = require('../app/models/escola');
const Usuario = require('../app/models/usuario');

describe('Criando registros', () => {
    let aluno;
    let professor;

    it('salva um aluno', () => {
        aluno = new Aluno({ nome: 'Joao' });
        aluno.save()
            .then(() => {
                assert(!aluno.isNew);
            });
    });

    it('salva um professor', () => {
        professor = new Professor({ nome: 'Paulo' });
        professor.save()
        .then(() => {
            assert(!professor.isNew);
        });
    });

    it('salva um atendimento', (done) => {
        const atendimento = new Atendimento({
            aluno: aluno,
            professor: professor,
            tipo: 'A'
        });
        atendimento.save()
            .then(() => Atendimento.findOne({}))
            .then(result => {
                assert(result.encaminhamento);
                done();
            });
    });

    it('salva uma escola', () => {
        const escola = new Escola({ nome: 'Escolinha' });
        escola.save()
        .then(() => {
            assert(!escola.isNew);
        });
    });

    it('salva uma usuario', () => {
        const usuario = new Usuario({
            nome: 'usuario',
            auth: 'full'
        });
        usuario.save()
        .then(() => {
            assert(!usuario.isNew);
        });
    });
});
