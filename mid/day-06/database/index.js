const { Sequelize } = require('sequelize');

const protocol = 'mysql:';
const host = 'localhost';
const user = 'nodejs';
const password = 'Purist_Platform_Hardener2';
const port = '3306';
const database = 'nodejs_exercice';

// Exercice 6

const sequelize = new Sequelize(`${protocol}//${user}:${password}@${host}:${port}/${database}`,{
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch((error) => console.error('Unable to connect to the database:', error));
  

module.exports = sequelize;
