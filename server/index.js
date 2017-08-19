var app = require('./config/custom-express')();
require('./config/database')('localhost/craepro');

app.listen(3000, function() {

	console.log("Server started.");
});