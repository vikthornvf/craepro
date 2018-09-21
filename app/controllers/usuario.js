var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

exports.list = (req, res) => {
	Usuario.find()
		.sort({ email: 1 })
		.populate('escola')
		.exec((err, usuarios) => {
			if (err) return res.status(500).json(err);
			res.json(usuarios);
		});
};

exports.listSolicitado = (req, res) => {
	Usuario.find({ solicitado: true })
		.sort({ email: 1 })
		.populate('escola')
		.exec((err, usuarios) => {
			if (err) return res.status(500).json(err);
			res.json(usuarios);
		});
};

exports.add = (req, res) => {
	const usuario = new Usuario();
	usuario.nome = req.body.nome;
	usuario.email = req.body.email;
	usuario.tipo = req.body.tipo;
	usuario.escola = req.body.escola;
	usuario.permissoes = req.body.permissoes;
	usuario.solicitado = req.body.solicitado;
	usuario.setPassword(req.body.senha);

	Usuario.create(usuario, (err, usuario) => {
		if (err) return res.status(500).json(err);
		res.json(usuario);
	});
};

exports.findById = (req, res) => {
	Usuario.findById(req.params.id, (err, usuario) => {
		if (err) return res.status(500).json(err);
		if (!usuario) return res.status(404).send('Usuário não encontrado.');
		res.json(usuario);
	});
};

exports.update = (req, res) => {
	Usuario.findByIdAndUpdate(req.params.id, req.body, (err, usuario) => {
		if (err) return res.status(500).json(err);
		res.json(usuario);
	});
};

exports.deleteById = (req, res) => {
	Usuario.findByIdAndRemove(req.params.id, (err, usuario) => {
		if (err) return res.status(500).json(err);
		res.json(usuario);
	});
};
