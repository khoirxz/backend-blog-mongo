import mongoose from "mongoose";

import BlogModel from "../models/blogSchema.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await BlogModel.find();

    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await BlogModel.find({
      slug: slug,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message,
    });
  }
};

export const postBlog = async (req, res) => {
  const post = req.body;

  const newPost = new BlogModel(post);
  try {
    await newPost.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      error: "error",
      message: "post not found",
    });
  }

  try {
    const updatePost = await BlogModel.findByIdAndUpdate(
      _id,
      { ...post, id: _id },
      {
        new: true,
      }
    );

    res.status(201).json(updatePost);
  } catch (error) {
    res.status(409).json({
      error: "error",
      message: "post not found",
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "error",
      message: "post not found",
    });
  }

  try {
    await BlogModel.findByIdAndRemove(id);

    res.status(201).json({
      status: "success",
      message: "post deleted",
    });
  } catch (error) {
    res.status(409).json({
      error: "error",
      message: "post not found",
    });
  }
};
