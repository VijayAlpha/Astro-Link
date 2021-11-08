import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from './../model/userModel.js'
import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/appError.js'

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    /* this will create a new token and send to user, this token is used to access the protected routes */
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);
  
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token, // the token is stores in user conmputer , then the protected routes will use it.(without this tokens other users can't use your personal infos)
      data: {
        user,
      },
    });
  };
  
  export const signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
      userName:  req.body.userName,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
  
    createSendToken(newUser, 201, res);
  });

  export const login = catchAsync(async (req, res, next) => {
    
    const { email, password } = req.body;
  
    // 1) Check if the email and password are exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
  
    // 2) Check the user exist and password is correct
    const user = await User.findOne({ email }).select('+password'); // this will return false or error while there is no user in that given email address
     
    if (!user || !(await user.correctPassword(password, user.password))) {
      // if the email or password is not correct throws(send res) 401 error to user
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) if every thing is okay send token to client
    createSendToken(user, 200, res);
  });
  
 export const protect = catchAsync(async (req, res, next) => {

    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! please log in to get access', 401)
      );
    }

    // 2) verification token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // this methode decode the token using our secretCode , and return the decode
  
    // 3) find the user
    const freshUser = await User.findById(decode.id);
  
    if (!freshUser) {
      return next(
        new AppError('The user belonging to this token does not exist.', 401)
      );
    }
  
    // GRANT ACCESS TO THE PROTECTED ROUTE
    req.user = freshUser;
  
    next();
  });