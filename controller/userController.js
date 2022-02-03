const fs = require('fs');
const sharp = require('sharp');
const User = require('../model/userModel.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  if (req.files.avatar) {
    req.files.avatar[0].filename = `user-pp-${req.user.id}.jpeg`;

    await sharp(req.files.avatar[0].buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(`public/img/users/${req.files.avatar[0].filename}`);
  }

  if (req.files.banner) {
    req.files.banner[0].filename = `user-banner-${req.user.id}.jpeg`;

    await sharp(req.files.banner[0].buffer)
      .resize(600, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.files.banner[0].filename}`);
  }

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    user: req.user,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  if (req.params.username.startsWith('@')) {
    const userName = req.params.username.split('@')[1];

    const user = await User.findOne({ userName: userName }).populate('links');

    if (!user) {
      return next(new AppError('No User found with that UserName', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } else {
    next();
  }
});

exports.getUsers = catchAsync(async (req , res , next) => {
  const users = await User.find({});

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
})

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update , Please use /updateMyPassword route'
      )
    );
  }

  const filteredBody = filterObj(
    req.body,
    'name',
    'userName',
    'userBio',
    'avatar',
    'banner',
    'email',
    'socialLinks'
  );

  if (req.files) {
    if (req.files.avatar) {
      filteredBody.avatar = {
        imgData:  fs.readFileSync(`public/img/users/${req.files.avatar[0].filename}`),
        contentType: 'image/jpeg'
      }
    };
    if (req.files.banner) {
      filteredBody.banner = {
        imgData:  fs.readFileSync(`public/img/users/${req.files.banner[0].filename}`),
        contentType: 'image/jpeg'
      }
    };
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});
