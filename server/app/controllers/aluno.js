const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');

module.exports = {

	list(req, res) {
		Aluno.find({})
			.sort({ nome: 1 })
			.populate('escola')
			.then((result) => {
				res.json(result);
			},
			err => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	add(req, res) {
		Aluno.create(req.body)
			.then((result) => {
				res.json(result);
			},
			err => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	findById(req, res) {
		Aluno.findById(req.params.id)
			.populate('escola')
			.then(function(result) {
				if (!result) throw Error('Aluno não encontrado.');
				res.json(result);
			},
			function(err) {
				console.log(err);
				res.status(404).json(err);
			});
	},

	update(req, res) {
		Aluno.findByIdAndUpdate(req.params.id, req.body)
			.then(function(result) {
				res.json(result);
			},
			function(err) {
				console.log(err);
				res.status(500).json(err);
			});
	},

	updateSituacao(req, res) {
		const aluno = req.body;
		if (aluno) {
			Aluno.findByIdAndUpdate(req.params.id, { $set: { situacao: aluno.situacao }})
			.then(function(result) {
				res.json(result);
			},
			function(err) {
				console.log(err);
				res.status(500).json(err);
			});
		}
	},

	deleteById(req, res) {
		Aluno.remove({_id: req.params.id})
			.then(function() {
				res.sendStatus(204);
			},
			function(err) {
				console.log(err);
				res.status(500).json(err);
			});
	}
};
