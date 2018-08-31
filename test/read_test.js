const assert = require('assert');
const Aluno = require('../app/models/aluno');
const Atendimento = require('../app/models/atendimento');
const Profissional = require('../app/models/profissional');
const Escola = require('../app/models/escola');
const Usuario = require('../app/models/usuario');

describe.only('Lista registros', (done) => {
    let aluno;
    let atendimento;
    let atendimento2;
    let profissional;
    let profissional2;
    let escola;
    let usuario;

    beforeEach((done) => {
        escola = new Escola({ nome: 'Escolinha' });
        aluno = new Aluno({ nome:'Joao', escola: escola });
        atendimento = new Atendimento({ tipo: 'A' });
        atendimento2 = new Atendimento({ tipo: 'P' });
        profissional = new Profissional({ nome: 'Paulo' });
        profissional2 = new Profissional({ nome: 'Ze' });

        escola.save()
            .then(() => {
                Promise.all([aluno.save(), profissional.save(), profissional2.save()])
                    .then(() => {
                        atendimento.aluno = aluno;
                        atendimento.profissional = profissional;

                        atendimento2.aluno = aluno;
                        atendimento2.profissional = profissional2;

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

    it('lista os atendimentos de certo profissional', (done) => {
        Atendimento.find({ profissional: profissional })
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
