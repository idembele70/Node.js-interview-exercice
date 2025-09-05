const winston = require('winston');
const expressWinston = require('express-winston');


const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.simple()
  ),
    }),
  ],
  
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
});

module.exports = logger;
