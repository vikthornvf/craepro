var express    = require('express');
var consign    = require('consign');
var bodyParser = require('body-parser');
var path       = require('path');

module.exports = function() {

	var app = express();

	app.set('clientPath', path.join(__dirname, '../..', 'client'));
	console.log(app.get('clientPath'));

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	consign()
		.include('models')
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
}