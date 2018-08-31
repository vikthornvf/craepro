var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var Escola = mongoose.model('Escola');

exports.list = function(req, res) {
	Escola.find({})
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
	Escola.create(req.body)
		.then((result) => {
			res.json(result);
		},
		err => {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.findById = function(req, res) {
	Escola.findById(req.params.id)
		.then(function(result) {
			if (!result) throw Error('Escola não encontrada.');
			res.json(result);
		},
		function(err) {
			console.log(err);
			res.status(404).json(err);
		});
};

exports.update = function(req, res) {
	Escola.findByIdAndUpdate(req.params.id, req.body)
		.then(function(result) {
			res.json(result);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
};

exports.deleteById = function(req, res) {
	Escola.remove({_id: req.params.id})
		.then(function() {
			res.sendStatus(204);
		},
		function(err) {
			console.log(err);
			res.status(500).json(err);
		});
};
