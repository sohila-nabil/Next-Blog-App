import Blog from "../../../../../lib/models/blogModel";
import { dbConnection } from "../../../../../lib/config/dbConnection";
import User from "../../../../../lib/models/userModel";


export async function GET(req, { params }) {
  try {
    await dbConnection();
    const { id } = await params;
    let blog = await Blog.findById(id).populate("comments.user", "username profilePicture");
    if (!blog) {
      return Response.json(
        { success: false, message: "Blog Not Found" },
        { status: 404 }, 
      );
    }
    return Response.json(
      {
        success: true,
        message: "Blog Retrieved Successfully",
        comments: blog.comments,
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
   
