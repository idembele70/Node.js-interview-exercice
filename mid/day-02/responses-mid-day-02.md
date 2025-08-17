=====
QCM
=====
1. C
2. A,D
3. A, B, D
4. A
5. A
=====
CODE
=====
6. js```
const validateApiKey = (req, res, next) => {
  const apiKeyHeader = req.headers['x-api-key'];

  if (!apiKeyHeader) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  next();
}
```
7. js```
const path = require('path');
const fs = require('fs').promises;

const appendLog = async (message) => {
  try {
    const filePath = path.resolve(__dirname, 'logs.txt');

    const date = new Date().toISOString()
    const logEntry = `${date}: ${message}\n`;
    await fs.appendFile(filePath, logEntry, 'utf8');
    console.log('Log entry added');
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}
```
8. js```

const _ = require('lodash');

function groupUsersByRole(users) {
  const roles = _.groupBy(users, "role");
  const result =  _.map(roles, (v) => {
    return _.map(v, 'name')
  })
  return result
}

const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Clara", role: "admin" },
];

const usersRole = groupUsersByRole(users);

console.log("Roles:", usersRole);
```

9. js```
const userList = [
"toto", "tata", "meme", "titi"
];

app.get('/users/:id', function(req, res) {
  const index = userList.findIndex((_, index) => index + 1 === Number(req.params.id));
  if (index === -1) {
    res.status(404).json({ message: 'Not found!' });
    return;
  }
  return res.status(200).json({name: userList[index] });  
});
```

10. js```
async function fetchPosts(ids) {
try {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts/exi'
    const results = await Promise.allSettled(ids.map(id => {
    const url = new URL(id, baseUrl);
      return fetch(url).then(res=> res.json())
    }));
    return results.map(result => result.status === "rejected" ? null : result.value)
  }  catch (err) { console.error(err); }
}
(async function(){
  const  ids = [1, 2254889];
  const result = await fetchPosts(ids)
  console.log(result);
})()
```

