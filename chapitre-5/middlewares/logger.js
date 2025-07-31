import express from 'express'

export default function logger(req = express.request, res = express.response, next){
  console.log(`${req.method} ${req.url}`);
  next();
}