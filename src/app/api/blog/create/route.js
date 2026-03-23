import cloudinary from "../../../../../lib/config/cloudinary";
import { dbConnection } from "../../../../../lib/config/dbConnection";
import Blog from "../../../../../lib/models/blogModel";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    await dbConnection();

    const user = await currentUser();
    console.log(user);

    if (!user) {
      return new Response({ success: false, message: "Unauthorized" });
    }

    const role = user?.publicMetadata?.role;
    const userId = user?.publicMetadata?.userMongoId;

    if (role !== "admin" && role !== "author") {
      return new Response({ success: false, message: "Unauthorized" });
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description");
    const file = formData.get("image");

    if (!file) {
      return new Response({ success: false, message: "No file uploaded" });
    }

    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "blog_app" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const blogData = await Blog.create({
      title,
      category,
      description,
      userId,
      slug,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });

    return Response.json({ success: true, data: blogData });
  } catch (error) {
    console.log("ERROR:", error);
    return new Response("Server Error", {error});
  }
}
