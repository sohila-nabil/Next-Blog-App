import cloudinary from "../../../../lib/config/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

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

    return Response.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (error) {
    console.log(error);
    return new Response("Upload failed", { status: 500 });
  }
}
