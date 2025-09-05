module.exports = function (req, res, next) {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'You are not authorized' });

  req.user = { role: 'admin' }
  next();
}
