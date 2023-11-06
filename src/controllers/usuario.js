const pool = require("../config/connection/bancoDeDados");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordJwt = require("../config/security/passwordJwt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    let texto = "SELECT id FROM usuarios WHERE email = $1";
    let valor = [email];
    const { rowCount: emailCadastrado } = await pool.query(texto, valor);
    if (emailCadastrado) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const senhaCriptografia = await bcrypt.hash(senha, 10);

    texto =
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING * ";
    valor = [nome, email, senhaCriptografia];
    const { rows: usuariosCadastrados } = await pool.query(texto, valor);
    const usuarioCadastrado = usuariosCadastrados[0];
    delete usuarioCadastrado.senha;
    return res.status(201).json(usuarioCadastrado);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const perfil = (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    return res.status(500).json({ message: "Não autorizado." });
  }
};

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    let texto = "SELECT * FROM usuarios WHERE email = $1";
    let valor = [email];
    const { rowCount: emailCadastrado, rows: usuariosCadastrados } =
      await pool.query(texto, valor);
    if (emailCadastrado === 0) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    const usuarioCadastrado = usuariosCadastrados[0];
    const conferirSenha = await bcrypt.compare(senha, usuarioCadastrado.senha);
    if (!conferirSenha) {
      return res.status(401).json({ mensagem: "Senha inválida" });
    }

    const token = jwt.sign({ id: usuarioCadastrado.id }, passwordJwt, {
      expiresIn: "30d",
    });
    return res.json({ token });
  } catch (erro) {
    console.log(erro.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarPerfil = async (req, res) => {
  const id = req.user.id;
  const { nome, email, senha } = req.body;
  if (!email || !nome || !senha) {
    return res
      .status(400)
      .json({ message: "Existem campos obrigatórios não preenchidos." });
  }

  const emailEncontrado = await pool.query(
    `SELECT email FROM usuarios WHERE email = $1 AND id != $2`,
    [email, id]
  );

  if (emailEncontrado.rows.length > 0) {
    return res
      .status(403)
      .json({ message: "Email já em uso. Não autorizado." });
  }

  try {
    const usuario = req.user;
    const usuarioObj = {
      email: email || usuario.email,
      nome: nome || usuario.nome,
      senha: senha || usuario.senha,
    };

    if (usuario.email === usuarioObj.email) {
      return res.json({ message: "Esse já é o seu email." });
    }

    const usuarioAtualizado = await pool.query(
      "UPDATE usuarios SET email = $1, nome = $2, senha = $3 WHERE id = $4",
      [usuarioObj.email, usuarioObj.nome, usuarioObj.senha, id]
    );

    return res.json();
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = {
  cadastrarUsuario,
  logarUsuario,
  perfil,
  editarPerfil,
};
