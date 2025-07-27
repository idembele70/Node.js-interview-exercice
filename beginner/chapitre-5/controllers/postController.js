import express from 'express'

export const getAllPosts = function(req = express.request, res = express.response) {
  res.status(200).send([]);
}

export const createPost = function(req = express.request, res = express.response) {
  console.log(req.body);
  res.status(200).send(req.body);
}