var mongoose = require('mongoose');
var model = mongoose.model('Aluno');
var controller = {};

controller.list = (req, res) => {
	model.find()
		.then((alunos) => {
			res.json(alunos);
		},
		err => {
			console.log(err);
			res.status(500).json(err);
		});
}

controller.add = (req, res) => {
	model.create(req.body)
		.then((aluno) => {
			res.json(aluno);
		},
		err => {
			console.log(err);
			res.status(500).json(err);
		});
}

controller.findById = function(req, res) {

	model.findById(req.params.id)
		.then(function(aluno) {
			if (!aluno) throw Error('Aluno não encontrado.');
			res.json(aluno);
		},
		function(err) {
			console.log(err);
			res.status(404).json(err);
		});
}

controller.update = function(req, res) {

	model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(aluno) {
			res.json(aluno);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
}

controller.deleteById = function(req, res) {

	model.remove({_id: req.params.id})
		.then(function() {
			res.sendStatus(204);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
}

module.exports = controller;