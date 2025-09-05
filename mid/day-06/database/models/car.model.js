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
