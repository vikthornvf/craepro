var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Atendimento = mongoose.model('Atendimento');

exports.list = function(req, res) {
	const aluno = { _id: req.params.alunoId };
	const profissional = { _id: req.params.profissionalId };

	let query = {};
	if (aluno._id) {
		query.aluno = aluno;
	}
	if (profissional._id) {
		query.profissional = profissional;
	}

	Atendimento.find(query)
		.sort({ solicitacao: 1 })
		.populate('aluno')
		.populate('profissional')
		.then((result) => {
			res.json(result);
		},
		err => {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.add = function(req, res) {
	Atendimento.create(req.body)
		.then((result) => {
			res.json(result);
		},
		err => {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.findById = function(req, res) {
	Atendimento.findById(req.params.id)
		.populate('aluno')
		.populate('profissional')
		.then(function(result) {
			if (!result) throw Error('Atendimento não encontrado.');
			res.json(result);
		},
		function(err) {
			console.log(err);
			res.status(404).json(err);
		});
};

exports.update = function(req, res) {
	Atendimento.findByIdAndUpdate(req.params.id, req.body)
		.then(function(result) {
			res.json(result);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.deleteById = function(req, res) {
	Atendimento.remove({_id: req.params.id})
		.then(function() {
			res.sendStatus(204);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
};
