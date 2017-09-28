process.env.NODE_ENV = 'production';

var app = require('./config/express')();
require('./config/database')('localhost/craepro');

app.listen(3000, function() {

	console.log('Server started.');
});