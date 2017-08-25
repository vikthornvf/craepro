var mongoose = require('mongoose');
var model = mongoose.model('Aluno');
var controller = {};

controller.list = function(req, res) {

	model.find()
		.then(function(fotos) {
			res.json(fotos);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
}

controller.add = function(req, res) {

	model.create(req.body)
		.then(function(foto) {
			res.json(foto);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
}

controller.findById = function(req, res) {

	model.findById(req.params.id)
		.then(function(foto) {
			if (!foto) throw Error('Aluno não encontrado.');
			res.json(foto);
		},
		function(err) {
			console.log(err);
			res.status(404).json(err);
		});
}

controller.update = function(req, res) {

	model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(foto) {
			res.json(foto);
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