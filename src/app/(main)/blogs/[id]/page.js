import Footer from "../../../../../components/Footer";
import BlogContent from "../../../../../components/BlogContent";

export default async function BlogPage({ params }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_BACKEND_URL_PRODUCTION}/api/blog/one/${id}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  const blog = data.blog;

  return (
    <>
      <BlogContent blog={blog} />
      <Footer />
    </>
  );
}
