import express from 'express';
import * as z from 'zod';

const app = express();

// Question 5
const middlewareOne = (req, res, next) => {
  const err = new Error('fake Error');

  next(err);
  //next()
}

const middlewareTwo = (req, res, next) => {
  console.log('inside middleware two');
  next();
}

const middlewareThree = (err, req, res, next) => {
  console.log('Inside middleware three');
  console.log(err);
  //if(!err)
    next()
}

app.get('/error', middlewareOne, middlewareTwo, (req, res) => {
  res.sendStatus(200);
})

app.get('/', (req, res) => {
  res.sendStatus(200);
})

// Question 6

function validateHeaderAuthorization(req, res, next) {
    const schema = z.string().regex(/^Bearer\s.+$/);

    const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res.status(401).json({ error: 'Missing Authorization header' });
      }

    const result = schema.safeParse(authorizationHeader);
    if (!result.success)
      return res.status(401).json({ error: 'Invalid Authorization format' });
    
    req.token = authorizationHeader.split(' ')[1];
    next();
}

app.get('/authorization', validateHeaderAuthorization, (req, res) => {
  console.log('Request token: %s', req.token);
  res.sendStatus(200);
});

// Question 7
import fs from 'node:fs/promises';

const logSchema = z.object({
  method: z.string(),
  url: z.string(),
  ip: z.string(),
  date: z.string().datetime(),
});

async function logRequestToFile(req, res, next) {
  try {
    const filePath = 'access.log';
    const { method, url, ip } = req;
    const logData = {
      method,
      url,
      ip,
      date: new Date().toISOString(),
    }

    const validatedLog = logSchema.parse(logData);
    const logEntry = JSON.stringify(validatedLog, null, 2) + '\n';
    
    await fs.appendFile(filePath, logEntry, 'utf8');
    next();
  } catch (err) {
    console.error('Error while appending log:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

app.get('/log', logRequestToFile, (req, res) => {
  res.sendStatus(200);
});


// Question 8
import _ from 'lodash';
function countUsersByRole(users) {
  const groups = _.groupBy(users, 'role');

  const roleCount = _.mapValues(groups, g => _.size(g))
  return roleCount
}

const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Clara', role: 'admin' },
];

const result = countUsersByRole(users);
//console.log(result);

// Exercice 9

const tasks = [
  { id: 1, title: 'Buy milk' },
  { id: 2, title: 'Read book' },
];


app.use(express.json());

const updateTaskSchema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().nonempty().trim(),
});

app.put('/tasks/:id', (req, res) => {
  try {
    const parsed = updateTaskSchema.parse({ id: req.params.id, title: req.body.title });
    const task = tasks.find((t) => t.id === parsed.id);

    if (!task)
      return res.status(404).json({ message: 'Task not found' });

    task.title = parsed.title;
    
    res.status(200).json(task);
  } catch (err) {
    if (err instanceof z.ZodError)
      return res.status(400).json({ error: err.errors });
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Exercice 10

const fetchPosts = async(ids) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com/posts/';

  const results = await Promise.allSettled(
    ids.map(async(id) => {
      const url = new URL(String(id), baseUrl);
      const res = await fetch(url.href);

      if (!res.ok) return null;
      return res.json();
    })
  );

  return results.map(r => r.status === 'fulfilled' ? r.value : null)
}

const ids = [1,2,3,4,54587];

(async function(){
  const result = await fetchPosts(ids);

  console.log(result);
})()


const { PORT } = process.env
app.listen(PORT, () => {
  console.log('app listening on port: %d', PORT);
});


