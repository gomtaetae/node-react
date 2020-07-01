const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },

  email: {
    type: String,
    trim: true,
    unique: 1,
  },

  password: {
    type: String,
    minlength: 50,
  },

  lastname: {
    type: String,
    maxlength: 50,
  },

  //관리자이거나 일반유저이거나
  role: {
    type: Number,
    default: 0,
  },
  image: String,

  //유효성 검사를 할 수 있다.
  token: {
    type: String,
  },

  //유효기간
  tokenExp: {
    type: Number
  }

})

const User = mongoose.model('User', userSchema);

module.exports = { User };