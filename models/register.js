const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
var uniqueValidator = require("mongoose-unique-validator");

const userschema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  password: { type: String, required: [true, "Please provide password"] },
});

userschema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

userschema.plugin(uniqueValidator);

const user = mongoose.model("user", userschema);

module.exports = user;
