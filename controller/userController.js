
import sharp from 'sharp';
import User from "../model/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";


export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-pp-${req.user.id}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
  
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
  
    return newObj;
  };

  
export const getMe = catchAsync(async (req, res, next) => {
    res.status(200).json({
     user: req.user
    })
});

export const getUser = catchAsync(async (req, res , next) =>{

    const user = await User.findOne({userName: req.params.username}).populate('links');

    if(!user) {
        return next(new AppError('No User found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});


export const updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password update , Please use /updateMyPassword route'
        )
      );
    }
  
    const filteredBody = filterObj(req.body, 'name', 'email' , 'userName' , 'photo', 'userBio' , 'socialLinks');
    if (req.file) filteredBody.photo = req.file.filename;


    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      status: 'success',
      user: updatedUser,
    });
  });