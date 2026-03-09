import { writeFile } from "fs/promises";
import { dbConnection } from "@/lib/config/dbConnection";
import { NextResponse } from "next/server";
import Blog from "@/lib/models/blogModel";

export async function POST(request) {
  await dbConnection();
  const formData = await request.formData();
  const timeStamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timeStamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `${timeStamp}_${image.name}`;
  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    auther: formData.get("auther"),
    autherImg: formData.get("autherImg"),
    image: imgUrl,
  };
  console.log(blogData);

  await Blog.create(blogData);
  return NextResponse.json({ sucess: true, msg: "Blog Added Sucessfully" });
}
