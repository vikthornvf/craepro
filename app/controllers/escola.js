var mongoose = require('mongoose');
var Escola = mongoose.model('Escola');

exports.list = (req, res) => {
	Escola.find()
		.sort({ nome: 1 })
		.exec((err, escolas) => {
			if (err) return res.status(500).json(err);
			res.json(escolas);
		});
};

exports.add = (req, res) => {
	Escola.create(req.body, (err, escola) => {
		if (err) return res.status(500).json(err);
		res.json(escola);
	});
};

exports.findById = (req, res) => {
	Escola.findById(req.params.id, (err, escola) => {
		if (err) return res.status(500).json(err);
		if (!escola) return res.status(404).send('Escola não encontrada.');
		res.json(escola);
	});
};

exports.update = (req, res) => {
	Escola.findByIdAndUpdate(req.params.id, req.body, (err, escola) => {
		if (err) return res.status(500).json(err);
		res.json(escola);
	});
};

exports.deleteById = (req, res) => {
	Escola.findByIdAndRemove(req.params.id, (err, escola) => {
		if (err) return res.status(500).json(err);
		res.json(escola);
	});
};
