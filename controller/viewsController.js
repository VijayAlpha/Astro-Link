import User from "../model/userModel.js";
import Link from "../model/linkModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getUser = catchAsync(async (req, res, next) => {
  if (req.params.username.startsWith("@")) {
    const userName = req.params.username.split("@")[1];

    const user = await User.findOne({ userName: userName }).populate("links");

    if (!user) {
      return next(new AppError("No User found with that User Name", 404));
    }

    res.status(200).render("userview", { user });
  } else {
    next();
  }
});

export const getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

export const getSignupForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Create Account",
  });
};

export const getMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  const loggedIn = req.loggedIn;
  res.status(200).render("userview", { user, loggedIn });
});

export const getSettings = (req, res) => {
  const user = req.user;

  if (req.params.pages == "account") {
    return res.status(200).render("account-settings", { title: "Account settings", user });
  }
  if (req.params.pages == "social") {
    return res.status(200).render("social-settings", { title: "Social Settings", user });
  }
  if (req.params.pages == "privacy") {
    return res.status(200).render("password-settings", { title: "Password Settings", user });
  }

  //if no params just send the settings page
  res.status(200).render("settings", { title: "Settings", user });
};

export const getAddLink = catchAsync(async (req, res, next) => {
  res.status(200).render("addLink", {
    title: "Add Link",
  });
});

export  const getEditLink = catchAsync(async (req, res, next) => {

  const link = await Link.findById(req.params.id);

  if(!link){
    return new AppError("No link found with that id", 404);
  }

  res.status(200).render("addLink", {
    title: "Edit Link",
    link
  });
});