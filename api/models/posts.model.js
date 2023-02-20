const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Post", postSchema);
