require('dotenv').config();

var app = require('./config/express')();
require('./config/database')(process.env.DB_URI);

app.listen(3000, function() {

	console.log('Server started.');
});