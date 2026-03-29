import Blog from "../../../../../../lib/models/blogModel";
import { dbConnection } from "../../../../../../lib/config/dbConnection";
import cloudinary from "./../../../../../../lib/config/cloudinary";

export async function PATCH(req, { params }) {
  try {
    await dbConnection();
    const { id } = await params;

    let blog = await Blog.findById(id);
    if (!blog) {
      return Response.json(
        { success: false, message: "Blog Not Found" },
        { status: 500 },
      );
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description");
    const file = formData?.get("image");

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.description = description || blog.description;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      let uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blog_app" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      if (blog.image.public_id) {
        await cloudinary.uploader.destroy(blog.image.public_id);
      }

      blog.image.url = uploadResult.secure_url;
      blog.image.public_id = uploadResult.public_id;
    }

    await blog.save();
    return Response.json(
      { success: true, message: "Blog Edit Successfully", blog },
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
