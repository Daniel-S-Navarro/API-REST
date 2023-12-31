const jwt = require('jsonwebtoken');
const pool = require('../config/connection/bancoDeDados');
const senhaJwt = require('../config/security/passwordJwt');

const usuarioLogado = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'não autorizado.' })
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, senhaJwt);

    const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id]);

    if (rowCount < 1) {
      return res.status(401).json({ message: 'não autorizado.' })
    }

    req.user = rows[0];

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Não autorizado.' });
  }

}

module.exports = {
  usuarioLogado
};