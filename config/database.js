module.exports = (uri) => {
	var mongoose = require('mongoose');
	mongoose.Promise = global.Promise;

	mongoose.connect(uri);
	var db = mongoose.connection;

	db.on('connected', console.log.bind(console, 'MongoDB connected.'));
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));
	db.on('disconnected', console.log.bind(console, 'MongoDB disconnected.'));

	process.on('SIGINT', () => {
		db.close(() => {
			console.log.bind(console, 'Server shutdown.');
			process.exit(0);
		});
	});
}
