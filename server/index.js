require('dotenv').config();
const express     = require('express');
const consign     = require('consign');
const bodyParser  = require('body-parser');
const path        = require('path');
const passport    = require('passport');

const app = express();

let dir = process.env.NODE_ENV === 'production'
	? path.join(__dirname, '/..', 'client/dist')
	: path.join(__dirname, '/..', 'client/src');
app.use(express.static(dir));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign({cwd: 'app'})
	.include('models')
	.then('routes')
	.then('controllers')
	.into(app);

require('./config/database')(process.env.DB_URI);
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, () => {
	console.log('Server started.');
});
