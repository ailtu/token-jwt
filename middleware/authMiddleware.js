const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // pego o tokenn e trato com ? se o token for undefined

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // token válido
  } catch (err) {
    res.status(403).json({ message: 'Token inválido ou expirado' });
  }
}

module.exports = authMiddleware;