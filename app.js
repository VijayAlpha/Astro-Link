const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controller/errorController.js');
const userRouter = require('./routes/userRoute.js');
const linkRouter = require('./routes/linkRoute.js');
const viewRouter = require('./routes/viewRouter.js');

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

const app = express();

dotenv.config();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('./public'));

// //Limit request from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);

app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// to compress the res size to user
app.use(compression());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/link', linkRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`server running on ${PORT} :${process.env.NODE_ENV}`)
    )
  )
  .catch(error => console.log('ERROR:' + error.message));

// process.on('unhandledRejection', err => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
//   server.close(() => {
//     console.log('💥 Process terminated!');
//   });
// });
