const express = require("express");
const conta = require("../controllers/conta");
const usuario = require("../controllers/usuario");
const middleware = require("../middlewares/middleware");
const validacao = require("../middlewares/validacoes");

const rotas = express();

rotas.post("/usuario", validacao.validarNomeEmailSenha, usuario.cadastrarUsuario);
rotas.post("/login", validacao.validarEmailSenha, usuario.logarUsuario);
rotas.get("/usuario", middleware.usuarioLogado, usuario.perfil);
rotas.put("/usuario", middleware.usuarioLogado, usuario.editarPerfil);
rotas.get("/categoria", middleware.usuarioLogado, conta.listarCategorias);
rotas.get("/transacao", middleware.usuarioLogado, conta.listarTransacao);
rotas.get("/transacao/:id", middleware.usuarioLogado, conta.detalharTransacao);
rotas.post("/transacao", middleware.usuarioLogado, validacao.validarCadastroTransacao, conta.cadastrarTransacao);
rotas.put('/transacao/:id', middleware.usuarioLogado, conta.atualizarTransacao);
rotas.delete('/transacao/:id', middleware.usuarioLogado, conta.excluirTransacao);
rotas.get("/transacao/extrato", middleware.usuarioLogado, conta.obterExtratoTransacao);

module.exports = rotas;
