const mongoose = require("mongoose");
//this is user schema
const user = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("User", user);
