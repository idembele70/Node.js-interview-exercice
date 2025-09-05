const { Op } = require('sequelize');

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
    const car = await Car.create(validCar);
    res.status(201).json(car);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('errors:', err);
      return res.status(400).json({ errors: err.errors });
    }
    else
      console.error('Unexpected error:', err);
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

const searchCars = async (req, res) => {
  try {
    const SearchCarsSchema = z.object({
      brand: z.string().min(1).trim(),
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).default(10),
    })

    const { brand, page, limit } = SearchCarsSchema.parse(req.query);
    const where = brand ? { brand : { [Op.like]:`%${brand}%` } } : {};
    const {count, rows } = await Car.findAndCountAll({
      where,
      offset: (page -1) * limit,
      limit,
    });
    res.status(200).json({ totalCount: count, page, limit, cars: rows });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('errors:', err);
      return res.status(400).json({ errors: err.errors });
      }
    console.error('Error during searching car', err);
    res.status(500).json({ err: 'Internal server error'});
  }
}

module.exports = {
  addCar,
  getCars,
  searchCars,
}
