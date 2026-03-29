import Blog from "../../../../../../lib/models/blogModel";
import { dbConnection } from "../../../../../../lib/config/dbConnection";
import User from "../../../../../../lib/models/userModel";

export async function POST(req, { params }) {
  try {
    await dbConnection();
    const { id } = await params;
    
    let blog = await Blog.findById(id);
    if (!blog) {
      return Response.json(
        { success: false, message: "Blog Not Found" },
        { status: 404 }, // Changed to 404 for not found
      );
    }
    
    const { text, user } = await req.json();
    
    // Validate input
    if (!text || !user) {
      return Response.json(
        { success: false, message: "Text and user are required" },
        { status: 400 },
      );
    }
    
    // Add comment
    blog.comments.push({ text, user });
    await blog.save(); // Only need to save once
    
    // Populate the comments after saving
    const updatedBlog = await Blog.findById(id)
      .populate("comments.user", "username profilePicture");
    console.log(updatedBlog.comments);
    return Response.json(
      {
        success: true,
        message: "Comment Added Successfully",
        blog: updatedBlog,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}