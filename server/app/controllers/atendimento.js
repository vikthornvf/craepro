const mongoose = require('mongoose');
const Atendimento = mongoose.model('Atendimento');

module.exports = {

	list(req, res) {
		const aluno = { _id: req.params.alunoId };
		const professor = { _id: req.params.professorId };

		let query = {};
		if (aluno._id) {
			query.aluno = aluno;
		}
		if (professor._id) {
			query.professor = professor;
		}

		Atendimento.find(query)
			.then((result) => {
				res.json(result);
			},
			err => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	add(req, res) {
		Atendimento.create(req.body)
			.then((result) => {
				res.json(result);
			},
			err => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	findById(req, res) {
		Atendimento.findById(req.params.id)
			.then(function(result) {
				if (!result) throw Error('Atendimento não encontrado.');
				res.json(result);
			},
			function(err) {
				console.log(err);
				res.status(404).json(err);
			});
	},

	update(req, res) {
		Atendimento.findByIdAndUpdate(req.params.id, req.body)
			.then(function(result) {
				res.json(result);
			},
			function(err) {
				console.log(err);
				res.status(500).json(err);
			});
	},

	deleteById(req, res) {
		Atendimento.remove({_id: req.params.id})
			.then(function() {
				res.sendStatus(204);
			},
			function(err) {
				console.log(err);
				res.status(500).json(err);
			});
	}
};
