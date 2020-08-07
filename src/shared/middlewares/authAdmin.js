const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const { promisify } = require('util');

const authConfig = require('../../config/auth');
const { defineUserId } = require('../lib/diffLog');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    if (!decoded.isAdmin) {
      return res
        .status(401)
        .json({ error: 'Operação não permitida para esse tipo de usuário' });
    }
    req.isAdmin = decoded.isAdmin;
    req.userId = decoded.id;

    defineUserId(ObjectId(req.userId));

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
