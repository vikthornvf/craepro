var mongoose = require('mongoose');
var Atendimento = mongoose.model('Atendimento');

exports.list = (req, res) => {
	const aluno = { _id: req.params.alunoId };
	const profissional = { _id: req.params.profissionalId };
	const query = {};
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
		.exec((err, atendimentos) => {
			if (err) return res.status(500).json(err);
			res.json(atendimentos);
		});
};

exports.add = (req, res) => {
	Atendimento.create(req.body, (err, atendimento) => {
			if (err) return res.status(500).json(err);
			res.json(atendimento);
		});
};

exports.findById = (req, res) => {
	Atendimento.findById(req.params.id)
		.populate('aluno')
		.populate('profissional')
		.exec((err, atendimento) => {
			if (err) return res.status(500).json(err);
			if (!atendimento) return res.status(404).send('Atendimento não encontrado.');
			res.json(atendimento);
		});
};

exports.update = (req, res) => {
	Atendimento.findByIdAndUpdate(req.params.id, req.body, (err, atendimento) => {
		if (err) return res.status(500).json(err);
		res.json(atendimento);
	});
};

exports.deleteById = (req, res) => {
	Atendimento.findByIdAndRemove(req.params.id, (err, atendimento) => {
		if (err) return res.status(500).json(err);
		res.json(atendimento);
	});
};
