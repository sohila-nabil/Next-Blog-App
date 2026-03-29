import { dbConnection } from "../../../../../../lib/config/dbConnection";
import Blog from "../../../../../../lib/models/blogModel";
import User from "../../../../../../lib/models/userModel";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await dbConnection();

    const { id } =await params;    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid ID" },
        { status: 400 },
      );
    }

    const blog = await Blog.findById(id).populate(
      "userId",
      "firstName lastName username profilePicture",
    );

    if (!blog) {
      return Response.json(
        { success: false, message: "Blog Not Found" },
        { status: 404 },
      );
    }

    return Response.json({ blog });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
