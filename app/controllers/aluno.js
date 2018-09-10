var mongoose = require('mongoose');
var Aluno = mongoose.model('Aluno');

exports.list = (req, res) => {
	Aluno.find()
		.sort({ nome: 1 })
		.populate('escola')
		.exec((err, alunos) => {
			if (err) return res.status(500).json(err);
			res.json(alunos);
		});
};

exports.create = (req, res) => {
	Aluno.create(req.body, (err, aluno) => {
		if (err) return res.status(500).json(err);
		res.json(aluno);
	});
};

exports.findById = (req, res) => {
	Aluno.findById(req.params.id)
		.populate('escola')
		.exec((err, aluno) => {
			if (err) return res.status(500).json(err);
			if (!aluno) return res.status(404).send('Aluno não encontrado.');
			res.json(aluno);
		});
};

exports.update = (req, res) => {
	Aluno.findByIdAndUpdate(req.params.id, req.body, (err, aluno) => {
		if (err) return res.status(500).json(err);
		res.json(aluno);
	});
};

exports.deleteById = (req, res) => {
	Aluno.findByIdAndRemove(req.params.id, (err, aluno) => {
		if (err) return res.status(500).json(err);
		res.json(aluno);
	});
};
