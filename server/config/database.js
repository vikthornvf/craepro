module.exports = (uri) => {
	const mongoose = require('mongoose');
	let options = {
		useMongoClient: true
	};
	mongoose.connect(uri, options);

	mongoose.connection.on('connected', () => {
		console.log('MongoDB connected.');
	});

	mongoose.connection.on('error', error => {
		console.log('MongoDB connection error: ' + error);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('MongoDB disconnected.');
	});

	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log('Server shutdown.');
			process.exit(0);
		});
	});
}