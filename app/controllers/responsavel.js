var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var Responsavel = mongoose.model('Responsavel');

exports.list = function(req, res) {
	const aluno = { _id: req.params.alunoId };
	let query = {};
	if (aluno._id) {
		query.aluno = aluno;
	}

	Responsavel.find(query)
		.sort({ nome: 1 })
		.then((result) => {
			res.json(result);
		},
		err => {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.add = function(req, res) {
	Responsavel.create(req.body)
		.then((result) => {
			res.json(result);
		},
		err => {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.findById = function(req, res) {
	Responsavel.findById(req.params.id)
		.then(function(result) {
			if (!result) throw Error('Responsavel não encontrado.');
			res.json(result);
		},
		function(err) {
			console.log(err);
			res.status(404).json(err);
		});
};

exports.update = function(req, res) {
	Responsavel.findByIdAndUpdate(req.params.id, req.body)
		.then(function(result) {
			res.json(result);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.deleteById = function(req, res) {
	Responsavel.remove({_id: req.params.id})
		.then(function() {
			res.sendStatus(204);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
};
