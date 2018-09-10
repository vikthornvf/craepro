const api                = require('express').Router();
const alunoRoutes        = require('./aluno');
const atendimentoRoutes  = require('./atendimento');
const authRoutes         = require('./auth');
const escolaRoutes       = require('./escola');
const profissionalRoutes = require('./profissional');
const responsavelRoutes  = require('./responsavel');
const usuarioRoutes      = require('./usuario');

api.use('/aluno', alunoRoutes);
api.use('/atendimento', atendimentoRoutes);
api.use('/auth', authRoutes);
api.use('/escola', escolaRoutes);
api.use('/profissional', profissionalRoutes);
api.use('/responsavel', responsavelRoutes);
api.use('/usuario', usuarioRoutes);

module.exports = api;
