const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
	let options = {
		useMongoClient: true
	};
	mongoose.connect('mongodb://localhost/craepro', options);
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Warning', error);
    });
})

beforeEach((done) => {
    const { alunos, atendimentos, profissionals, escolas, usuarios } = mongoose.connection.collections;
    alunos.drop(() => {
        atendimentos.drop(() => {
            profissionals.drop(() => {
                escolas.drop(() => {
                    usuarios.drop(() => {
                        done();
                    });
                });
            });
        });
    });
});
