module.exports = function(uri) {
	var mongoose = require('mongoose');

	mongoose.connect('mongodb://' + uri);

	mongoose.connection.on('connected', function() {
		console.log('MongoDB connected.');
	});

	mongoose.connection.on('error', function(error) {
		console.log('MongoDB connection error: ' + error);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('MongoDB disconnected.');
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Server shutdown.');
			process.exit(0);
		});
	});
}