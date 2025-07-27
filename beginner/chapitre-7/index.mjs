import express from 'express';
import helmet from 'helmet';
import fs from 'fs/promises';
const app = express();

app.use(helmet({frameguard: 'deny'}))

app.get('/home', (req, res) => {
  res.status(200).send('Welcome to home page');
})

app.get('/erreur', (req, res, next) => {
  const err = new Error('Erreur délibérée!');
  next(err)
});

app.use((err, req, res, next) => {
  console.log(app.get('env'));
  console.error(`Erreur capturée: ${err.message}`);
  res.status(500).send('Quelque chose a mal tourné!');
})

const requireToken = function(req, res, next) {
  try {
    const authorizationHeader = req.headers['authorization'];
    const TOKEN_PREFIX = 'Bearer ';
    const EXPECTED_TOKEN = 'secret-token';

    if(!authorizationHeader || !authorizationHeader.startsWith(TOKEN_PREFIX))
      return res.status(401).json({ message: 'Authorization header is missing or malformed' });

    const token = authorizationHeader.slice(TOKEN_PREFIX.length);

    if(token !== EXPECTED_TOKEN)
      return res.status(403).json({message: 'Access denied'});

    next();
  } catch(err) {
    console.error('[requireToken]', err);
    res.status(500).json({ message: 'Internal Server Error'});
  }
}

app.get('/token', requireToken, (req, res) => {
  res.status(200).json({message: 'Welcome to token page!'});
})

const timeoutMiddleware = function(req = express.request, res = express.request, next){
  const TIMEOUT_DURATION_MS = 5_000;
  req.timedout = false;

  res.setTimeout(TIMEOUT_DURATION_MS, () => {
    req.timedout = true;
    console.error('Request has timed out.');
    console.log('res.headersSent', res.headersSent)
    if(!res.headersSent) {
      res.status(408).json({message: 'Request timeout.'});
    }
  });
    next();
}

app.get('/fast', timeoutMiddleware, (req, res) => {
  res.status(200).send('Welcome to fast page');
})

app.get('/slow', timeoutMiddleware, (req, res = express.response) => {
    const DELAY_MS = 6_000;
    setTimeout(() => {
      if(!req.timedout)
        res.status(200).send('You should never reach this page...');
    }, DELAY_MS);
  if(req.timedout) {
    res.send()
    console.log(res.headersSent)
  }
})

function logJson(req = express.request, res, next){
  const logPayload = {
    method: req.method,
    path: req.path,
    time: new Date().toLocaleTimeString()
  }
  console.log(JSON.stringify(logPayload));
  next();
}

app.get('/log', logJson, (req, res) => {
  res.status(200).json({ message: 'Welcome to log page!'})
});

app.use('/upload', express.raw({ type: '*/*', limit: '5mb'}));

app.post('/upload', async (req = express.request, res) => {
  try {
    const FILE_PATH = 'uploads/file.txt';
    await fs.writeFile(FILE_PATH, req.body);
    res.status(201).send('File saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('File write failed');
  }
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port %s', process.env.PORT);
});