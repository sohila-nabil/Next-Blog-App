import { dbConnection } from "../../../../../lib/config/dbConnection";
import Blog from "../../../../../lib/models/blogModel";
import User from "../../../../../lib/models/userModel";
export async function POST(req) {
  try {
    await dbConnection();
    const data = await req.json();
    let page = data.page || 1;
    let limit = data.limit || 6;
    let skip = (page - 1) * limit;

    let searchTerm = data.searchTerm;
    let category = data.category;

    const query = {
      ...(category && category !== "all" && { category }),
      ...(searchTerm && {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
      }),
    };

    const blogs = await Blog.find(query)
      .populate("userId", "firstName lastName profilePicture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const categories = await Blog.distinct("category");
    const totalBlogs = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalBlogs / limit);

    // ✅ Await counts
    const publishedStatus = await Blog.countDocuments({ status: "Published" });
    const draftStatus = await Blog.countDocuments({ status: "Draft" });

    return new Response(
      JSON.stringify({
        blogs,
        totalBlogs,
        totalPages,
        currentPage: page,
        categories,
        publishedStatus,
        draftStatus,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response("Server Error", { status: 500 });
  }
}
