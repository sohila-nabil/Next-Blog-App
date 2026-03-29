import { dbConnection } from "../../../../../lib/config/dbConnection";
import Blog from "../../../../../lib/models/blogModel";
import User from "../../../../../lib/models/userModel";
export async function GET() {
  try {
    await dbConnection();

    const blogs = await Blog.find({ status: "Published" }).populate(
      "userId",
      "firstName lastName username profilePicture",
    );
    const categories = await Blog.distinct("category");

    return new Response(
      JSON.stringify({
        blogs,
        categories,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response("Server Error", { status: 500 });
  }
}
