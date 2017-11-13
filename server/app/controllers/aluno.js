const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');

module.exports = {

	list(req, res) {
		const escola = { _id: req.params.escolaId };
		const isDesativado = req.params.isDesativados;

		let query = {};
		if (escola._id) {
			query.escola = escola;
		}

		Aluno.find(query)
			.populate('escola', 'nome')
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
			.populate('')
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
