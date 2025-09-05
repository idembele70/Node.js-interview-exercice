====
QCM
====
1. A
2. B
3. A
4. B
5. A

=====
CODE
=====
6. ```js
const { Sequelize, DataTypes } = require('sequelize');

const protocol = 'mysql:';
const host = 'localhost';
const user = 'nodejs';
const password = 'Purist_Platform_Hardener2';
const port = '3306';
const database = 'nodejs_exercice';

// Exercice 6
// app.js
const sequelize = require('./database');
const express = require('express');
const { z } = require('zod');
const app = express();
const router = require('./routing');

app.use(express.json());

app.get('/home', (req, res) => {
  res.sendStatus(200);
})

app.use(express.json())

app.use(router);

const PORT = 5125;
app.listen(PORT, () =>{
  console.log('App is listenning on port:', PORT);
})
// car.model.js
const sequelize = require('../');
const { DataTypes } = require('sequelize');

const Car = sequelize.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      min: 2000,
    },
  }
});

sequelize.sync({ alter: true }).then(() => {
  console.log('Car table created successfully');
}).catch((error) => {
  console.error('Unable to create table: ', error);
});

module.exports = Car;
// car.controllers.js
const formatZodErrors = require('../services/format-zod-errors');
const { z } = require('zod');
const Car = require('../database/models/car.model');

const addCar = async (req, res) => {
  try {
    const CarSchema = z.object({
      brand: z.string().min(1).trim(),
      model: z.string().min(1).trim(),
      year: z.number().gte(2000),
    });
    const validCar = CarSchema.parse(req.body);
    const car = Car.build(validCar);
    await car.save();
    res.status(200).json(validCar);
  } catch (err) {
    if (err instanceof z.ZodError)
      console.error('errors:', err);
    else
      console.error('Error during user creation', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await Car.findAll();

    res.status(200).json(cars);
  } catch (err) {
    console.error('Error during selecting all users from database', err);
    res.status(500).json({ error: 'Internal server error' }); 
  }
}

module.exports = {
  addCar,
  getCars,
}
// car.routes.js
const router = require('express').Router();

const {
  addCar,
  getCars,
} = require('../controllers/cars.controllers');
const userAgent = require('../middleware/user-agent');

router.use(userAgent);
router.post('/', addCar);
router.get('/', getCars);

module.exports = router;
// routing/index.js
const router = require('express').Router();
const carsRouter = require('./cars.routes');

router.use('/cars', carsRouter);

module.exports = router;
// database/index.js
const { Sequelize } = require('sequelize');

const protocol = 'mysql:';
const host = 'localhost';
const user = 'nodejs';
const password = 'Purist_Platform_Hardener2';
const port = '3306';
const database = 'nodejs_exercice';

// Exercice 6

const sequelize = new Sequelize(`${protocol}//${user}:${password}@${host}:${port}/${database}`);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch((error) => console.error('Unable to connect to the database:', error));
  

module.exports = sequelize;
// middleware/user-agent.js
module.exports = function (req, res, next) {
  const userAgentHeader = req.get('user-agent');

  if (!userAgentHeader) return res.status(401).json({ error: 'No user agent header found' });

  next();
}
```
7. ```js
// authorization-header.js
module.exports = function (req, res, next) {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'You are not authorized' });

  req.user = { role: 'admin' }
  next();
}

```
8. ```js
const cron = require('node-cron');
const { Sequelize, Op } = require('sequelize');
const Car = require('./database/models/car.model');
const sequelize = new Sequelize('sqlite:memory:');

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((err) => console.error('Unable to connect to the database', err));


cron.schedule('0 0 * * *', async () => {
  await Car.destroy({
    where: {
      year: {
        [Op.lt]: 2010
      }
    }
  });
})
```
9. ```js
// cars.controllers
const searchCars = async (req, res) => {
  try {
    const SearchCarsSchema = z.object({
      brand: z.string().min(1).trim(),
      page: z.coerce.number(),
      limit: z.coerce.number()
    })

    const { brand, page, limit } = SearchCarsSchema.parse(req.query);
    const {count, rows } = await Car.findAndCountAll({
      where: {
        brand: {
          [Op.substring]: brand,
        },
      },
      offset: page -1 ,
      limit,
    });
    res.status(200).json({ totalCount: count, cars: rows });
  } catch (err) {
    if (err instanceof z.ZodError)
      console.error('errors:', err);
    console.error('Error during searching car', err);
    res.status(500).json({ err: 'Internal server error'});
  }
}
// cars.routes
const router = require('express').Router();

const {
  addCar,
  getCars,
  searchCars,
} = require('../controllers/cars.controllers');
const userAgent = require('../middleware/user-agent');
const authorizationHeader = require('../middleware/authorization-header');

router.use(userAgent);
router.use(authorizationHeader);
router.post('/', addCar);
router.get('/', getCars);
router.get('/search', searchCars);

module.exports = router;
10. ```js
// logger.js
const winston = require('winston');
const expressWinston = require('express-winston');

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),     
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  
});

module.exports = logger;
//error-logger.js
const winston = require('winston');
const expressWinston = require('express-winston');

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),     
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  
});

module.exports = logger;

// health
app.get('/health', (req, res) => {
  const uptime = Math.floor(process.uptime());

  console.log(uptime)
  res.status(200).json({ status: 'ok', uptime: uptime});
});
```

Ticket:
Activity-reference faire un ticket sur la selection de plusierus activity-reference
