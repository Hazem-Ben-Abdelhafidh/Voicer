const Post= require('../models/postModel');
const factory= require('./handlerFactory');
exports.getAllPosts= async(req,res,next)=>{
    const allPosts= await Post.find();
    res.status(200).json({
        status:'success',
        data: {
            posts:allPosts
        }
    });
}

exports.createPost= factory.createOne(Post);
exports.getPost= factory.getOne(Post,{path:'comments'})
exports.updatePost=factory.updateOne(Post);
exports.deletePost=factory.deleteOne(Post);