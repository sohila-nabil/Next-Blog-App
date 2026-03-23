import { dbConnection } from "../../../../../../lib/config/dbConnection";
import User from "../../../../../../lib/models/userModel";
import { clerkClient } from "@clerk/nextjs/server";

export async function DELETE(req, { params }) {
  try {
    await dbConnection();
    const { id } = await params;
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "User ID required" }),
        { status: 500 },
      );
    }
    let user = await User.findOneAndDelete({ clerkId: id });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User Not Found" }),
        { status: 500 },
      );
    }

    const client = await clerkClient();
    await client.users.deleteUser(id);
    
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
