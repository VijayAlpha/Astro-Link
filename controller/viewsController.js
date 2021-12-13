import User from "../model/userModel.js";
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
    title: "create account",
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
    return res.status(200).render("account-settings", { user });
  }
  if (req.params.pages == "social") {
    return res.status(200).render("social-settings", { user });
  }
  if (req.params.pages == "privacy") {
    return res.status(200).render("password-settings", { user });
  }

  //if no params just send the settings page
  res.status(200).render("settings", { user });
};

export const getAddLink = catchAsync(async (req, res, next) => {
  res.status(200).render("addLink", {
    title: "add Link",
  });
});

export const getSocialLinks = (req, res) => {
  res.status(200).render("social-links", {
    title: "create account",
  });
};
