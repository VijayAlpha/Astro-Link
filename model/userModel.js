const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Please provide username'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    avatar: {
      imgData: Buffer,
      contentType: String,
    },
    banner:{
      imgData: Buffer,
      contentType: String,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    userBio: {
      type: String,
    },
    // socialLinks:[
    //   {
    //     appName:  {
    //       type: String,
    //       required: [true, 'Please enter app name !'],
    //     },
    //     address: {
    //       type: String,
    //       required: [true, 'Please enter address !'],
    //     }
    //   }
    // ]
    socialLinks: {
      phone: {
        type: String,
        validate: [
          validator.isMobilePhone,
          'Please provide a valid phone number',
        ],
      },
      email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email'],
      },
      instagram: {
        type: String,
      },
      twitter: {
        type: String,
      },
      clubhouse: {
        type: String,
      },
      snapchat: {
        type: String,
      },
      facebook: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL'],
      },
      linkedIn: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL'],
      },
      pinterest: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL'],
      },
      youtube: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL'],
      },
      whatsapp: {
        type: String,
        validate: [
          validator.isMobilePhone,
          'Please provide a valid phone number',
        ],
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('links', {
  ref: 'Link',
  foreignField: 'user',
  localField: '_id',
});

// this to save the user password in encrypted formate.(not to expoler by others)
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//METHODS
// this to check the password in the DB and the password entered by user is same or not
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10mins * 60sec * 1000ms = 10mins

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
