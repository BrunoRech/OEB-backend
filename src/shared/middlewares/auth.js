const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authConfig = require('../../config/auth');
// const Institution = require('../models/Institution');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.isAdmin = false;
    req.userId = decoded.id;

    // const institution = await Institution.findById(req.userId);

    // if (!institution) {
    //   return res.status(401).json({ error: 'Instituição não encontrada' });
    // }

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
