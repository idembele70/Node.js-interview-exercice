module.exports = function (req, res, next) {
  const userAgentHeader = req.get('user-agent');

  if (!userAgentHeader) return res.status(401).json({ error: 'No user agent header found' });

  next();
}
