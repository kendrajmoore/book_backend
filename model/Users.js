const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt");
const crypto = require('crypto');
const Schema = mongoose.Schema;

//user model
const UsersSchema = new Schema({
  username: String,
  email: String,
  password: String,
  bookList: String,
  hash: String,
  salt: String
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};


UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

// Must use function here! ES6 => functions do not bind this!
// UserSchema.pre("save", function(next) {
//   // SET createdAt AND updatedAt
//   const now = new Date();
//   this.updatedAt = now;
//   if (!this.createdAt) {
//     this.createdAt = now;
//   }

//   // ENCRYPT PASSWORD
//   const user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       user.password = hash;
//       next();
//     });
//   });
// });

// UserSchema.methods.comparePassword = function(password, done) {
//   bcrypt.compare(password, this.password, (err, isMatch) => {
//     done(err, isMatch);
//   });
// };

mongoose.model("Users", UsersSchema);