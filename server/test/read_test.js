const assert = require('assert');
const Aluno = require('../app/models/aluno');
const Atendimento = require('../app/models/atendimento');
const Professor = require('../app/models/professor');
const Escola = require('../app/models/escola');
const Usuario = require('../app/models/usuario');

describe.only('Lista registros', (done) => {
    let aluno;
    let atendimento;
    let atendimento2;
    let professor;
    let professor2;
    let escola;
    let usuario;

    beforeEach((done) => {
        escola = new Escola({ nome: 'Escolinha' });
        aluno = new Aluno({ nome:'Joao', escola: escola });
        atendimento = new Atendimento({ tipo: 'A' });
        atendimento2 = new Atendimento({ tipo: 'P' });
        professor = new Professor({ nome: 'Paulo' });
        professor2 = new Professor({ nome: 'Ze' });

        escola.save()
            .then(() => {
                Promise.all([aluno.save(), professor.save(), professor2.save()])
                    .then(() => {
                        atendimento.aluno = aluno;
                        atendimento.professor = professor;

                        atendimento2.aluno = aluno;
                        atendimento2.professor = professor2;

                        atendimento.save();
                        atendimento2.save();
                    })
                    .then(() => done());
            });
    });

    it('lista alunos chamados Joao', (done) => {
        Aluno.find({ nome: 'Joao' })
            .then(result => {
                assert(result[0]._id.toString() === aluno._id.toString());
                done();
            });
    });

    it.only('encontra aluno pelo id', (done) => {
        Aluno.findOne({ _id: aluno._id })
            .populate('escola')
            .populate('atendimentos')
            .populate('responsavels')
            .then(result => {
                console.log(result);
                assert(result.nome === 'Joao');
                done();
            });
    });

    it('lista todos os atendimentos', (done) => {
        Atendimento.find({})
            .then((atendimentos) => {
                console.log(atendimentos);
                done();
            });
    });

    it('lista os atendimentos de certo aluno', (done) => {
        Atendimento.find({ aluno: aluno })
            .then((atendimentos) => {
                console.log(atendimentos);
                assert(atendimentos.length === 2);
                done();
            });
    });

    it('lista os atendimentos de certo professor', (done) => {
        Atendimento.find({ professor: professor })
            .then((atendimentos) => {
                console.log(atendimentos);
                assert(atendimentos.length === 1);
                done();
            });
    });

    xit('lista alunos que nao estao desativados', (done) => {
        // working solution:
        // db.getCollection('alunos').find({
        //     $or: [
        //         { atendimentos: { $exists: true, $ne: [] } },
        //         { atendimentos: { alta: null } }
        //     ]})
        Aluno.find({ atendimentos: { $exists: true, $ne: [] } })
            .populate({
                path: 'atendimentos',
                match: { alta: null }
            })
            .then((alunos) => {
                console.log(alunos);
                done();
            });
    });
});
