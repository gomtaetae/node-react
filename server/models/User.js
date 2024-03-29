const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
    minlength: 5,
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
  },

  reaction: [{
    name : {type: String},
    count : {type : Number},
  }]

})


//비밀번호를 암호화 시킨다 -> salt를 이용해서 비밀번호를 암호화 한다.
userSchema.pre('save', function (next) {

  var user = this;

  if (user.isModified('password')) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})



userSchema.methods.comparePassword = function(plainPassword, cb){
  
  //plainPassword와 암호화된 비밀번호가 같은지 확인
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return cb(err);
    cb(null, isMatch);
  })

}

userSchema.methods.generateToken = function(cb){

  var user = this;
  //jsonwebtoken을 이용해서 토큰을 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secretToken')

  // user._id + 'secretToken' = token
  // -> 'secretToken' -> user._id 가 나온다.

  user.token = token;
  user.save(function(err, user){
    if(err) return cb(err);
    cb(null, user);
  })
}

userSchema.statics.findByToken = function(token, cb){
  var user = this;

  //토큰을 decord한다.
  jwt.verify(token, 'secretToken', function(err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id": decoded, "token": token}, function(err, user){
      if(err) return cb(err);
      cb(null, user);
    })

  })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };