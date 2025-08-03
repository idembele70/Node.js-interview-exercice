const express = require('express');
const app = express();

app.get('/no/content', (req, res) => {
  res.sendStatus(204);
})

// Exercise 6
const IP_MAP = new Map();
const TIME_LIMIT = 3_000;
function rateLimiter(req, res, next) {
  const lastRequestTime = IP_MAP.get(req.ip);
  const now = Date.now();
  const hasReachLimit = now - lastRequestTime < TIME_LIMIT ;

  if(hasReachLimit)
    return res.status(429).json({ message: 'Too Many Requests'});

  IP_MAP.set(req.ip, now);
  next();
}

app.get('/rate/limiter', rateLimiter, (req, res) => {
  res.status(200).json({ message: 'Welcome !'});
})

// Exercise 7
const blockUserAgent = (req, res, next) => {
  try {
    const FORBIDDEN = 'curl';
    const ua = req.headers['user-agent'];
    if(ua.includes(FORBIDDEN))
      return res.sendStatus(401);

      next();
  } catch(err) {
    console.error(err)
    res.status(500).send('Interval server error');
  }
}

app.get('/block/user/agent', blockUserAgent , (req, res) => {
  res.sendStatus(200);
})

const adminRoute = require('./routing/admin.routing.cjs');

app.use('/admin', adminRoute);

app.get('/data', (req, res) => {
  const data = { name: 'John' };
  res.status(200).json(data);
});

// Exercise 10
function delayResponse(ms) {
  return (req, res, next) => {
    setTimeout(() => {
      next()
    }, ms);
  }
}

const DELAY = 3_000;
app.get('/delay/response', delayResponse(DELAY), (req, res) => {
  res.sendStatus(200);
})

const PORT = 45764;
app.listen(PORT, () => {
  console.log('Listening on port: %s', PORT);
});