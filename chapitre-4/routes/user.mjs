import express from 'express'
import { getUser } from '../controllers/userController.mjs';

const userRouter = express.Router();

userRouter.get('/user/:id', getUser);

export default userRouter