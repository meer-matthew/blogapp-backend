const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  },
  password: { type: String, required: true },
  birthDate: { type: String },
  address: { type: String, default: "" },
  contactNo: { type: String },
  gender: { type: String, default: "" },
  profilePic: { type: String, default: "" },
  posts: { type: Array, ref: "Post" },
});

module.exports = mongoose.model("Users", userSchema);
