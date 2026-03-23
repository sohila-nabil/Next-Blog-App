import { dbConnection } from "../../../../../../lib/config/dbConnection";
import Blog from "../../../../../../lib/models/blogModel";

export async function PATCH(req, { params }) {
  try {
    await dbConnection();
    console.log(await params);
    
    const { id } =await params;
    const data = await req.json();

    const blog = await Blog.findById(id);
    if (!blog) {
      return new Response(
        JSON.stringify({ success: false, message: "Blog Not Found" }),
        { status: 404 },
      );
    }

    blog.status = data.status;
    await blog.save();

    return new Response(
      JSON.stringify({ success: true, message: "Status updated", blog }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error", error }),
      { status: 500 },
    );
  }
}
