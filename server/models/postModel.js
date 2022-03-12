const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  body: String,
  likes: Number,
});

// virtual populate
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
