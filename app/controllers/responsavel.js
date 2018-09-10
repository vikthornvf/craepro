var mongoose = require('mongoose');
var Responsavel = mongoose.model('Responsavel');

exports.list = (req, res) => {
	const aluno = { _id: req.params.alunoId };
	const query = {};
	if (aluno._id) {
		query.aluno = aluno;
	}

	Responsavel.find(query)
		.sort({ nome: 1 })
		.exec((err, responsaveis) => {
			if (err) return res.status(500).json(err);
			res.json(responsaveis);
		});
};

exports.add = (req, res) => {
	Responsavel.create(req.body, (err, responsavel) => {
		if (err) return res.status(500).json(err);
		res.json(responsavel);
	});
};

exports.findById = (req, res) => {
	Responsavel.findById(req.params.id, (err, responsavel) => {
		if (err) return res.status(404).json(err);
		if (!responsavel) return res.status(404).send('Responsavel não encontrado.');
		res.json(responsavel);
	});
};

exports.update = (req, res) => {
	Responsavel.findByIdAndUpdate(req.params.id, req.body, (err, responsavel) => {
		if (err) return res.status(500).json(err);
		res.json(responsavel);
	});
};

exports.deleteById = (req, res) => {
	Responsavel.findByIdAndRemove(req.params.id, (err, responsavel) => {
		if (err) return res.status(500).json(err);
		res.json(responsavel);
	});
};
