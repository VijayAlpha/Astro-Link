const User = require('../model/userModel.js');
const Link = require('../model/linkModel.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');

exports.home = catchAsync(async (req, res, next) => {
  res.status(200).render('home');
});

exports.getUser = catchAsync(async (req, res, next) => {
  if (req.params.username.startsWith('@')) {
    const userName = req.params.username.split('@')[1];

    const user = await User.findOne({ userName: userName }).populate('links');

    if (!user) {
      return next(new AppError('No User found with that User Name', 404));
    }

    res.status(200).render('userview', { user });
  } else {
    next();
  }
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create Account',
  });
};

exports.getMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  const loggedIn = req.loggedIn;
  res.status(200).render('userview', { user, loggedIn });
});

exports.getSettings = (req, res) => {
  const user = req.user;

  if (req.params.pages == 'account') {
    return res
      .status(200)
      .render('account-settings', { title: 'Account settings', user });
  }
  if (req.params.pages == 'social') {
    return res
      .status(200)
      .render('social-settings', { title: 'Social Settings', user });
  }
  if (req.params.pages == 'privacy') {
    return res
      .status(200)
      .render('password-settings', { title: 'Password Settings', user });
  }

  //if no params just send the settings page
  res.status(200).render('settings', { title: 'Settings', user });
};

exports.getAddLink = catchAsync(async (req, res, next) => {
  res.status(200).render('addLink', {
    title: 'Add Link',
  });
});

exports.getEditLink = catchAsync(async (req, res, next) => {
  const link = await Link.findById(req.params.id);

  if (!link) {
    return new AppError('No link found with that id', 404);
  }

  res.status(200).render('addLink', {
    title: 'Edit Link',
    link,
  });
});

exports.getForgotPassword = catchAsync(async (req, res, next) => {
  res.status(200).render('forgot-password', {
    title: 'Forgot Password',
  });
});

exports.getRestPassword = catchAsync(async (req, res, next) => {
  res.status(200).render('rest-password', {
    title: 'Rest Password',
  });
});