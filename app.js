import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import AppError from "./utils/appError.js";
import userRouter from './routes/userRoute.js';
import linkRouter from './routes/linkRoute.js';
import viewRouter from './routes/viewRouter.js';

const app = express()

dotenv.config();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('./public'));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/', viewRouter);
app.use('/user', userRouter);
app.use('/link' , linkRouter);

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
