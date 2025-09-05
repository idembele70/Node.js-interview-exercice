====
QCM
====
1. D
2. A, B, C
3. C
4. D
5. B
=====
CODE
=====
6. ```js
function validateHeaderAuthorization(req, res, next) {
  //try {
    //const authorizationHeader = req.get('authorization');
    const authorizationHeader = req.headers['authorization'];
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: 'You\'re not authorized to access.' });
      }

    const token = authorizationHeader.split(' ')[1];
    if (!token)
      return res.status(401).json({ error: 'Token not found' });
    req.token = token;
    next();
 // } catch (err) {
 //   console.error('Error during header authorization key validation', err);
 //   res.status(500).json({ error: 'Internal server error' });
//  }
}
```
7. ```js
import fs from 'node:fs/promises';
async function logRequestToFile(req, res, next) {
  try {
    const filePath = 'access.log';
    const { method, url, ip } = req;
    const data = JSON.stringify({
      method,
      url,
      ip,
      date: new Date().toISOString(),
    }, null, 2)
    
    await fs.appendFile(filePath, data + ',\n', 'utf8');
    next()
  } catch (err) {
    console.error('Error while appending data', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
```
8. ```js
import _ from 'lodash';
function countUsersByRole(users) {
  const groups = _.groupBy(users, 'role');

  const roleCount = _.mapValues(groups, g => _.size(g))
  return roleCount
}
```
9. ```js
const tasks = [
  { id: 1, title: 'Buy milk' },
  { id: 2, title: 'Read book' },
];

import * as z from 'zod';

app.use(express.json());

app.put('/tasks/:id', (req, res) => {
  try {
    const idSchema = z.coerce.number().int().positive();
    const id = idSchema.parse(req.params.id);
    const task = tasks.find(t => t.id === id);

    const titleSchema = z.string().nonempty().trim();
    const newTitle = titleSchema.parse(req.body.title);

    if (!task)
      return res.status(404).json({ message: 'Task not found' });

    task.title = newTitle;
    
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    if (err.errors[0].code === 'too_small')
      return res.status(400).json({ message: 'title is missing' });
    res.status(500).json({ error: 'Internal server error' });
  }
})
```
10.
```js
const fetchPosts = async(ids) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com/posts/';

  const data = await Promise.allSettled(ids.map(async(id) => {
    const url = new URL(id, baseUrl);
    const res = await fetch(url.href);

    if (!res.ok)
      return null
    return res.json()
    
  }));

  return data.map(el => el.value)

}
```
