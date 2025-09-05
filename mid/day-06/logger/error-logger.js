const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.simple()
  ),
});
