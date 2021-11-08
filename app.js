import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from'cors';
import cookieParser from "cookie-parser";

import AppError from "./utils/appError.js";
import userRouter from './routes/userRoute.js';
import linkRouter from './routes/linkRoute.js';
import viewRouter from './routes/viewRouter.js';

const app = express()

dotenv.config();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('./public'));

app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/link' , linkRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
  .catch((error) => console.log(error.message));
