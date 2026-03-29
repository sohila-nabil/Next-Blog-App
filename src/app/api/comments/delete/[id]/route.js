import { dbConnection } from "../../../../../../lib/config/dbConnection";
import Blog from "../../../../../../lib/models/blogModel";
import User from "../../../../../../lib/models/userModel";

export async function DELETE(req, { params }) {
  try {
    await dbConnection();

    const { id } =await params; // no need to await params
    const blog = await Blog.findById(id);
    if (!blog) {
      return Response.json(
        { success: false, message: "Blog Not Found" },
        { status: 404 }
      );
    }

    const { commentId, userId } = await req.json();

    // Find the comment
    const comment = blog.comments.find(
      (c) => c._id.toString() === commentId
    );

    if (!comment) {
      return Response.json(
        { success: false, message: "Comment Not Found" },
        { status: 404 }
      );
    }

    // Check if the comment belongs to the requesting user
    if (comment.user.toString() !== userId) {
      return Response.json(
        { success: false, message: "Forbidden: You can only delete your own comments" },
        { status: 403 }
      );
    }

    // Filter out the comment
    blog.comments = blog.comments.filter(
      (c) => c._id.toString() !== commentId
    );
    await blog.save();

    return Response.json(
      { success: true, message: "Comment Deleted Successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}