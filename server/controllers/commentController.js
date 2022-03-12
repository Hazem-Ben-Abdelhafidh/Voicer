const Comment = require("./../models/commentModel");
const factory = require("./handlerFactory");

exports.getAllComments = async (req, res, next) => {
  let filter = {};
  if (req.params.postId) filter = { post: req.params.postId };
  const comments = await Comment.find(filter);
  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
};
exports.getComment= factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
exports.updateComment = factory.updateOne(Comment);
