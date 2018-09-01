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

const alunoRoutes        = require('./app/routes/aluno');
const atendimentoRoutes  = require('./app/routes/atendimento');
const authRoutes         = require('./app/routes/auth');
const escolaRoutes       = require('./app/routes/escola');
const profissionalRoutes = require('./app/routes/profissional');
const responsavelRoutes  = require('./app/routes/responsavel');
const usuarioRoutes      = require('./app/routes/usuario');

app.use('/api/aluno', alunoRoutes);
app.use('/api/atendimento', atendimentoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/escola', escolaRoutes);
app.use('/api/profissional', profissionalRoutes);
app.use('/api/responsavel', responsavelRoutes);
app.use('/api/usuario', usuarioRoutes);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/dist/index.html'));
});

require('./config/database')(process.env.DB_URI);
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
