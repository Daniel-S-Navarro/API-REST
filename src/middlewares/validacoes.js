const validarNomeEmailSenha = (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados" });
  }

  return next()
};

const validarEmailSenha = (req, res, next) => {
  const { email, senha } = req.body;
  
  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados" });
  }
  next()
  }

  const validarCadastroTransacao = (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos obrigatórios devem ser informados" });
    }

    next()
  }




module.exports = {
  validarNomeEmailSenha,
  validarEmailSenha,
  validarCadastroTransacao
}