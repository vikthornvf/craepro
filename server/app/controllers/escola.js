const mongoose = require('mongoose');
const Escola = mongoose.model('Escola');

module.exports = {

	list(req, res) {
		Escola.find({})
			.then((result) => {
				res.json(result);
			},
			err => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	add(req, res) {
		Escola.create(req.body)
			.then((result) => {
				res.json(result);
			},
			err => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	findById(req, res) {
		Escola.findById(req.params.id)
			.then(function(result) {
				if (!result) throw Error('Escola não encontrada.');
				res.json(result);
			},
			function(err) {
				console.log(err);
				res.status(404).json(err);
			});
	},

	update(req, res) {
		Escola.findByIdAndUpdate(req.params.id, req.body)
			.then(function(result) {
				res.json(result);
			},
			function(err) {
				console.log(err);
				res.status(500).json(err);
			});
	},

	deleteById(req, res) {
		Escola.remove({_id: req.params.id})
			.then(function() {
				res.sendStatus(204);
			},
			function(err) {
				console.log(err);
				res.status(500).json(err);
			});
	}
};
