import { dbConnection } from "../../../../../lib/config/dbConnection";
import User from "../../../../../lib/models/userModel";

export async function POST(req) {
  try {
    await dbConnection();
    const data = await req.json();
    let page = data.page || 1;
    let limit = data.limit || 6;
    let skip = (page - 1) * limit;
    let searchTerm = data.searchTerm;

    let query = {
      ...(searchTerm && {
        $or: [
          { username: { $regex: searchTerm, $options: "i" } },
          { firstName: { $regex: searchTerm, $options: "i" } },
          { lastName: { $regex: searchTerm, $options: "i" } },
        ],
      }),
    };

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    return new Response(
      JSON.stringify({
        users,
        totalUsers,
        totalPages,
        currentPage:page
      }),
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
