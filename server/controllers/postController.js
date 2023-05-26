import Post from "../models/postModel.js"
import user from "../models/userModel.js";
import asyncHandler from "express-async-handler";


export const createPost=asyncHandler(async(req,res)=>{
    try {
        const {
            userId,
            location,
            description,
            picturePath
        }=req.body;
        const User= await user.findById(userId);
        console.log(User);
        const post= await Post.create({
            userId,
            firstName:User.firstName,
            lastName:User.lastName,
            location:User.location,
            description,
            userPicturePath:User.picturePath,
            picturePath,
            likes:{},
            comments:[],
        });
        // console.log(post);
        const allPosts= await Post.find();
        res.status(201).json(allPosts);
    } catch (err) {
        res.status(409).json({message:err.message});
    }
   
});
export const getFeedPosts = async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      const post = await Post.find({ userId });
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  /* UPDATE */
  export const likePosts = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await Post.findById(id);
      const isLiked = post.likes.get(userId);
  
      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };