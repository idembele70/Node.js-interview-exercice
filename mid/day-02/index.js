// Question 2
//const fs = require('fs');

//const readableStream = fs.createReadStream('input.txt', 'utf8');

//const writableStream = fs.createWriteStream('output.txt');

//readableStream.on('data', (chunk) => {
//  chunk += chunk;
//});

//readableStream.on('finish', (d) => {
//  console.log(d);
//});

// Question 6
const express = require('express');
const app = express();

const EXPECTED_API_KEY = process.env.API_KEY || 'api-key';

const validateApiKey = (req, res, next) => {
  const apiKeyHeader = req.get('x-api-key');

  if (!apiKeyHeader || apiKeyHeader !== EXPECTED_API_KEY) {
    console.warn(`Unauthorized access attempt from IP: ${req.ip}`);
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  next();
}

app.get('/x/api/key', validateApiKey, (req, res) => {
  res.sendStatus(200);
});

// Question 7
const path = require('path');
const fs = require('fs').promises;

const LOG_FILE = process.env.LOG_FILE || path.resolve(__dirname, 'logs.txt');

const appendLog = async (message) => {
  const date = new Date().toISOString();
  const logEntry = `[${date}] ${message}\n`;
  try {
    await fs.appendFile(LOG_FILE, logEntry, 'utf8');
    console.log('Log entry added');
  } catch (err) {
    console.error('Logger error:', err.message);
  }
}

appendLog('Hello Node.js world');

// Question 8
const _ = require('lodash');

function groupUsersByRole(users) {
  const roles = _.groupBy(users, 'role');
  const result = _.mapValues(roles, (group) => group.map(u => u.name));

  return result;
}

const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Clara", role: "admin" },
];

const usersRole = groupUsersByRole(users);

console.log("Roles:", usersRole);

// Question 9
const userList = [
"toto", "tata", "meme", "titi"
];

app.get('/users/:id', function(req, res) {
  const id = Number(req.params.id);
  if (Number.isNan(id) || id < 1 || id > userList.length) {
    res.status(404).json({ message: 'Not found!' });
    return;
  }
  res.status(200).json({name: userList[id - 1] });  
});

// Question 10
async function fetchPosts(ids) {
try {
    const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/'
    const results = await Promise.allSettled(
      ids.map(id => {
        const url = new URL(id, BASE_URL);
          return fetch(url).then(res=> res.ok ? res.json() : null )
      }));
    return results.map(result => result.status === "fulfilled" ? result.value : null);
  }  catch (err) { console.error(err); return [] }
}
(async function(){
  const  ids = [1, 2254889];
  const result = await fetchPosts(ids)
  console.log(result);
})()

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listenning on port: %s', PORT);
});
