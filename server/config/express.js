var express     = require('express');
var consign     = require('consign');
var bodyParser  = require('body-parser');
var path        = require('path');

module.exports = function() {

	var app = express();

	let dir;
	if (process.env.NODE_ENV === 'production')
		dir = path.join(__dirname, '../..', 'client/dist');
	else
		dir = path.join(__dirname, '../..', 'client/src');
	app.use(express.static(dir));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	consign({cwd: 'app'})
		.include('models')
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
}