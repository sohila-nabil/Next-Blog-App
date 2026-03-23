import Blog from "../../../../../../lib/models/blogModel";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    let blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return new Response(
        JSON.stringify({ success: false, message: "Blog Not Found" }),
        { status: 500 },
      );
    }
    return new Response(
      JSON.stringify({ success: true, message: "Blog Deleted Successfully" }),
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
