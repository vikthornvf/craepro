require('dotenv').config();

const app = require('./config/express')();
require('./config/database')(process.env.DB_URI);

app.listen(3000, () => {
	console.log('Server started.');
});