const express = require('express');
const app = express();

app.get('/user/profile', (req, res) => {
  res.status(200).json({ message: 'Welcome to user profile page!' });
})
app.get('/user/:id', (req, res) => {
  res.status(200).json({ message: 'Welcome to user page!' });
})

// EXERCISE 6

function isAuthenticated(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  try {
    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    next();
  } catch (err) {
    console.err('Auth Middleware Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

app.get('/authenticated', isAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Welcome to authenticated user view' });
})

// Exercise 7
const fs = require('fs/promises');
async function loggerToFile(req, res, next) {
  const LOG_FILE = 'logs.txt';
  const { method, url, ip } = req;
  const logEntry = JSON.stringify(
    {
      ip,
      method,
      url,
      date: new Date().toISOString()
    }, null, 2) + '\n';

  try {
    await fs.appendFile(LOG_FILE, logEntry, 'utf8');
    next();
  } catch (err) {
    console.error('Logger error', err);
    res.status(500).json({ message: 'Internal server Error' });
  }
}

app.get('/logger', loggerToFile, async (req, res) => {
  res.status(200).json({ message: 'Welcome to logger page!' });
});

// Exercise 8

const ipTracker = new Map();
const REQUEST_LIMIT = 5;
const TIME = 60 * 1_000;

function advancedRateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  const existing = ipTracker.get(ip);

  if(!existing) {
    ipTracker.set(ip, { count: 1, firstRequestTimestamp: now });
    next()
    return;
  }
  const elapsed = now - values.firstRequestTimestamp;
  if(elapsed > TIME) {
    ipTracker.set(ip, { count: 1, firstRequestTimestamp: now });
    next();
    return;
  }

  const values = ipTracker.get(ip)
  if(values.count >= REQUEST_LIMIT) {
    res.sendStatus(429);
    return;
  }
  existing.count += 1
  ipTracker.set(ip, existing);

  next()
}

app.get('/advanced/rate/limit', advancedRateLimiter, (req, res) => {
  res.sendStatus(200)
})

// Exercise 9

const users = [
  {
    id: 1,
    name: 'Alice'
  }
]

app.use(express.json()).put('/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(user => user.id === userId);

  if(index === -1) {
    res.sendStatus(404);
    return;
  }


  const user = users[index];
  const name = req.body.name;
  try {
    if(!name) {
      res.sendStatus(400);
      return;
    }
    user.name = name;
    res.status(200).json(user);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
})

function errorHandler(err, req, res, next) {
  if(err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
    return;
  }
  next()
}

app.get('/error/handler', (req, res, next) => {
  try {
    const user = unexistingUsers[0];
    user.name
  } catch(err) {
    next(err);
  }

}, errorHandler)

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})