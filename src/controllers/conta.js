const pool = require("../config/connection/bancoDeDados");

const listarCategorias = async (req, res) => {
  try {
    const { rows: categorias } = await pool.query("select * from categorias");

    return res.json(categorias);
  } catch (error) {
    return res.status(500).json({ message: "erro interno no servidor." });
  }
};

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    let texto = "SELECT * FROM categorias WHERE id = $1";
    let value = [categoria_id];
    const { rowCount: categoriaIdExistente, rows } = await pool.query(
      texto,
      value
    );

    if (!categoriaIdExistente) {
      return res.status(400).json({ mensagem: "Categoria não cadastrada" });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(404).json({ mensagem: "Tipo de tranzação invalida" });
    }

    texto =
      "INSERT INTO transacoes (tipo, descricao, valor, data, usuario_id, categoria_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ";
    value = [tipo, descricao, valor, data, req.user.id, categoria_id];
    const { rows: transacaoCadastrada } = await pool.query(texto, value);
    const usuarioCadastrado = transacaoCadastrada[0];
    usuarioCadastrado.categoria_nome = rows[0].descricao;
    return res.status(201).json(usuarioCadastrado);
  } catch (erro) {
    return res.status(500).json({ mensagem: "erro interno no servidor." });
  }
};

const obterExtratoTransacao = async (req, res) => {
  try {
    const { id } = req.user;
    const { rows } = await pool.query(
      "SELECT SUM(CASE WHEN tipo = $1 THEN valor ELSE 0 END) AS entrada, SUM(CASE WHEN tipo = $2 THEN valor ELSE 0 END) AS saida FROM transacoes WHERE usuario_id = $3",
      ["entrada", "saida", id]
    );

    const { entrada, saida } = rows[0];

    const extrato = { entrada: entrada || 0, saida: saida || 0 };

    res.status(200).json(extrato);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter o extrato das transações." });
  }
};

const detalharTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    texto =
      "SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome FROM transacoes as t JOIN categorias as c on c.id = t.categoria_id WHERE t.id = $1";
    valor = [id];
    const { rows: transacoesEncontradas, rowCount: quantidadeTransacoes } =
      await pool.query(texto, valor);

    if (quantidadeTransacoes <= 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }
    return res.status(200).json(transacoesEncontradas[0]);
  } catch (erro) {
    return res.status(500).json({ mensagem: "erro interno no servidor." });
  }
};

const listarTransacao = async (req, res) => {
  try {
    const id = req.user.id;

    const { rows: transacoes } = await pool.query(
      "select * from transacoes where usuario_id = $1",
      [id]
    );

    return res.status(200).json(transacoes);
  } catch (error) {
    return res.status(500).json({ message: "erro interno no servidor." });
  }
};

const atualizarTransacao = async (req, res) => {
  const usuario = req.user;
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const { id } = req.params;

  try {
    const { rows: transacao, rowCount } = await pool.query(
      "select * from transacoes where id = $1",
      [id]
    );

    if (rowCount < 1) {
      return res.status(404).json({ message: "transação inexistente." });
    }

    const transacaoObj = {
      descricao: descricao || transacao.descricao,
      valor: valor || transacao.valor,
      data: data || transacao.data,
      categoria_id: categoria_id || transacao.categoria_id,
      tipo: tipo || transacao.tipo,
    };

    const transacaoAtualizada = await pool.query(
      "update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6",
      [
        transacaoObj.descricao,
        transacaoObj.valor,
        transacaoObj.data,
        transacaoObj.categoria_id,
        transacaoObj.tipo,
        usuario.id,
      ]
    );

    return res.json();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "erro interno no servidor." });
  }
};

const excluirTransacao = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "O id é obrigatório" });
  }

  try {
    const { rows, rowCount } = await pool.query(
      "select * from transacoes where id = $1",
      [id]
    );

    if (rowCount < 1) {
      return res.status(404).json({ message: "transação não encontrada" });
    }

    const deletarTransacao = await pool.query(
      "delete from transacoes where id = $1",
      [id]
    );

    return res.json();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "erro interno no servidor." });
  }
};

module.exports = {
  listarCategorias,
  detalharTransacao,
  cadastrarTransacao,
  listarTransacao,
  atualizarTransacao,
  excluirTransacao,
  obterExtratoTransacao,
};
