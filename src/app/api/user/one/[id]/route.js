import { dbConnection } from "../../../../../../lib/config/dbConnection";
import User from "../../../../../../lib/models/userModel";

export async function GET(req, { params }) {
  try {
    await dbConnection();
    let { id } = await params;
    const user = await User.findById(id);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User Not Found" }),
        { status: 500 },
      );
    }
    return new Response(
      JSON.stringify({ success: true, message: "User Deleted Successfully" }),
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
