import mongoose from "mongoose";
import validator from 'validator';
import bcrypt  from 'bcryptjs';
import Link from './linkModel.js';

const userSchema =  new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true,
  },
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
      type: String,
      default: 'default.jpg'
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    userBio: {
      type: String
    },
    coverPhoto: String,
    socialLinks: {
      phone: {
        type: String,
        validate: [validator.isMobilePhone, 'Please provide a valid phone number']
      },
      email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email']
      },
      instagram: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL']
      },
      facebook: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL']
      },
      clubhouse: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL']
      },
      linkedIn: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL']
      },
      pinterest: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL']
      },
      snapchat: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL']
      },
      twitter: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL']
      },
      youtube: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid URL']
      },
      whatsapp: {
        type: String,
        validate: [validator.isMobilePhone, 'Please provide a valid phone number']
      }
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
  );


  userSchema.virtual('links', {
    ref: 'Link',
    foreignField: 'user',
    localField: '_id'
  });


  // this to save the user password in encrypted formate.(not to expoler by others)
userSchema.pre('save', async function (next) {
  // if password is not modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// this to check the password in the DB and the password entered by user is same or not
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

export default User;