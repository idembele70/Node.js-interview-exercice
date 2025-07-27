const express = require('express');
const app = express();
const helmet = require('helmet');
const ping = require('./ping');

app.use(helmet.frameguard({ action: 'sameorigin'}));


const middleware = function(req, res, next) {
  const hour = new Date().getHours()
  if(hour >= 2 && hour < 4)
    return res.status(401).json({ message: 'Site under maintenace'});
  next()
}

app.get('/', middleware, (req, res) => {
  res.status(200).json('Welcome home')
})

app.get('/math/:operation', (req, res) => {
  try {
    const { params : { operation }, query : { a, b} } = req;
    let result = 0;
    const aToNumber = parseInt(a);
    const bToNumber = parseInt(b);
    if (operation === 'add')
      result = aToNumber + bToNumber;
    if (operation === 'multiply')
      result = aToNumber * bToNumber;
    res.status(200).json({result});
  } catch(err) {
    console.error(err);
    res.status(404).send('Something went wrong !');
  };
})

app.get('/ping', async (req, res) => {
  const response = await ping('https://example.com');
  res.send(response)
})

const validateBody = (schema) => {
  return function(req, res, next) {
    for (const key in schema) {
      if (typeof req.body[key] !== schema[key]) {
        return res.status(400).json({ error: `Invalid type for '${key}'`});
      }
    }
    next()

  }
}
app.use(express.json());

app.post('/user', validateBody({name: 'string', age: 'number'}), (req, res) => {
  res.status(200).json(req.body);
})
const MY_SECRET = 'my-secret';
const jwt = require('jsonwebtoken');
app.get('/token', (req, res) => {
  const token = jwt.sign({id: 1}, MY_SECRET);
  res.status(200).send(token)
})

app.get('/me', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if(!authHeader)
      return res.status(401).send('Authorization not found');
    
    const token = authHeader.split(' ')[1];
    
    if(!token)
      return res.status(401).send('Token not found');
   
    const decode = jwt.verify(token, MY_SECRET);
    res.status(200).json(decode);
  } catch (err) {
    console.error(err);
    res.status(403).send('Something went wrong');
  }

})

app.listen(process.env.PORT, () => {
  console.log('Listening on port %s', process.env.PORT);
});

const fs = require('fs/promises');

async function test() {
  try {
    await fs.readFile('unknown.txt', 'utf-8');
  } catch (err) {
    console.log('Caught');
  }
}

// test();