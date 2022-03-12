const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "you cant comment nothing you silly!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: [true, "comments must belong to a post"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "comments must belong to a user"],
  },
});

commentSchema.pre(/^find/,function(next){
  this.populate({
    path:'user',
    select:'name, photo'
  });
 
  next();
})
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
