import mongoose from "mongoose";
import validator from 'validator';

const linkSchema =  new mongoose.Schema({
    linkName: {
        type: String,
        required: [true , 'Please give a name to your link.']
    },
    link: {
        type: String,
        required: [true , 'Please provide a link.'],
        validate: [validator.isURL, 'Please provide a valid URL']
    },
    linkDescription: {
        type: String
    },
    photo: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Link must belong to a user']
      }
});

const Link = mongoose.model('Link', linkSchema);

export default Link;
  