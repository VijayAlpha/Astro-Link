import User from "../model/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";


export const getUser = catchAsync(async (req, res , next) =>{

    const user = await User.findOne({userName: req.params.username}).populate('links');

    if(!user) {
        return next(new AppError('No User found with that ID', 404));
    }

    res.status(200).render('user-view', {user});
});

export const getLoginForm = (req, res) => {
    res.status(200).render('login', {
      title: 'Log into your account'
    });
};