var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var Usuario = mongoose.model('Usuario');

exports.list = function(req, res) {
	Usuario.find({})
		.sort({ email: 1 })
		.populate('escola')
		.then((result) => {
			res.json(result);
		},
		err => {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.add = function(req, res) {
	const usuario = new Usuario();
	usuario.nome = req.body.nome;
	usuario.email = req.body.email;
	usuario.tipo = req.body.tipo;
	usuario.escola = req.body.escola;
	usuario.permissoes = req.body.permissoes;
	usuario.solicitado = req.body.solicitado;
	usuario.setPassword(req.body.senha);

	Usuario.create(usuario)
		.then((result) => {
			res.json(result);
		},
		err => {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.findById = function(req, res) {
	Usuario.findById(req.params.id)
		.then(function(result) {
			if (!result) throw Error('Usuário não encontrado.');
			res.json(result);
		},
		function(err) {
			console.log(err);
			res.status(404).json(err);
		});
};

exports.update = function(req, res) {
	Usuario.findByIdAndUpdate(req.params.id, req.body)
		.then(function(result) {
			res.json(result);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.deleteById = function(req, res) {
	Usuario.remove({_id: req.params.id})
		.then(function() {
			res.sendStatus(204);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
};
