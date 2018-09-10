var mongoose = require('mongoose');
var Profissional = mongoose.model('Profissional');

exports.list = (req, res) => {
	Profissional.find()
		.sort({ nome: 1 })
		.exec((err, profissionais) => {
			if (err) return res.status(500).json(err);
			res.json(profissionais);
		});
};

exports.add = (req, res) => {
	Profissional.create(req.body, (err, profissional) => {
		if (err) return res.status(500).json(err);
		res.json(profissional);
	});
};

exports.findById = (req, res) => {
	Profissional.findById(req.params.id, (err, profissional) => {
		if (err) return res.status(500).json(err);
		if (!profissional) return res.status(404).send('Profissional não encontrado.');
		res.json(profissional);
	});
};

exports.update = (req, res) => {
	Profissional.findByIdAndUpdate(req.params.id, req.body, (err, profissional) => {
		if (err) return res.status(500).json(err);
		res.json(profissional);
	});
};

exports.deleteById = (req, res) => {
	Profissional.findByIdAndRemove(req.params.id, (err, profissional) => {
		if (err) return res.status(500).json(err);
		res.json(profissional);
	});
};
