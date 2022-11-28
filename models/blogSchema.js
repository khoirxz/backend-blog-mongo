import mongoose, { Schema } from "mongoose";

const blogSchema = Schema({
  title: String,
  discription: String,
  thumbnail: String,
  author: String,
  slug: String,
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const BlogModel = mongoose.model("BlogSchema", blogSchema);

export default BlogModel;
