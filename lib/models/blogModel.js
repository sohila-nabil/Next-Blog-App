import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);


const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
