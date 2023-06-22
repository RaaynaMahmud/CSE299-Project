import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ msg: err.msg });
  }
};

export const getNewsfeedPosts  = async(req,res) => {
    try {
    
     const post = await Post.find() 
     res.status(201).json(post);
    } catch (error) {
     res.status(404).json({ msg: error.msg });
     console.log(error)
    }
 
 }
 
 export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.msg });
  }
};

export const like = async (req, res) => {
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

    const editedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(editedPost);
  } catch (err) {
    res.status(404).json({ msg: err.msg });
  }
};