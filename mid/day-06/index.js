const sequelize = require('./database');
const express = require('express');
const app = express();
const router = require('./routing');
const logger = require('./logger/winston');
const errorLogger = require('./logger/error-logger.js');

app.use(express.json());
app.use(logger);

app.get('/home', (req, res) => {
  res.sendStatus(200);
})

app.get('/health', (req, res) => {
  try {
    const healthCheck = {
      uptime: Math.floor(process.uptime()),
      status: 'OK',
      memory: process.memoryUsage(),
      timestamp: Date.now(),
    }

    res.status(200).json(healthCheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});


app.use(router);


app.get('/fail', (req, res) => {
  throw new Error("Oups ! Erreur simulée ❌");
});


app.use(errorLogger);

app.use((err, req, res, next) => {
  console.error("🔥 Global error handler:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Exercice 8
/*const cron = require('node-cron');
const { Sequelize, Op } = require('sequelize');
const Car = require('./database/models/car.model');
const sequelize = new Sequelize('sqlite:memory:');

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((err) => console.error('Unable to connect to the database', err));


cron.schedule('0 0 * * *', async () => {
  try {
    const deleted = await Car.destroy({
      where: {
        year: {
          [Op.lt]: 2010
        }
      }
    });
    console.log(`[CRON] ${deleted} cars deleted`);
  } catch (err) {
    console.error('[CRON ERROR]', err);
  }
})*/

const PORT = 5125;
app.listen(PORT, () =>{
  console.log('App is listenning on port:', PORT);
})
