const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
},{
  versionKey: false
})

const User = model('User', userSchema);

module.exports = User