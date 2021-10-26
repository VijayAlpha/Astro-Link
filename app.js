import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from './routes/userRoute.js';
import linkRouter from './routes/linkRoute.js';

const app = express()

dotenv.config();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('api/v1/user', userRouter);
app.use('api/v1/link' , linkRouter);

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
