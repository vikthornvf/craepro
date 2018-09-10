require('dotenv').config();
const consign      = require('consign');
const cookieParser = require('cookie-parser');
const express      = require('express');
const logger       = require('morgan');
const passport     = require('passport');
const path         = require('path');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist')));

consign({cwd: 'app'})
	.include('models')
	.then('controllers')
	.into(app);

const api = require('./app/routes');
app.use('/api', api);
app.get('*', (req, res) => {
	res.format({
		html: () => res.sendFile(path.join(__dirname, 'public/dist/index.html')),
		json: () => res.sendStatus(200)
	});
});

require('./config/database')(process.env.DB_URI);
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
