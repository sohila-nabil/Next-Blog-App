import { assets, blog_data } from "../Assets/assets";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog }) => {
  return (
    <div className="max-w-72 sm:max-w-72 bg-white border border-black hover:shadow-[-7px_7px_0px_0px_#000000]">
      <Link href={`/blogs/${blog.id}`}>
        <Image
          src={blog.image}
          alt="blog"
          width={400}
          height={400}
          className="border-b border-black"
        />
      </Link>

      <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
        {blog.category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {blog.title}
        </h5>
        <p className="mb-3 text-sm tracking-tight text-gray-700">
          {blog.description}
        </p>
        <Link href={`/blogs/${blog.id}`} className=" inline-flex items-center py-2 font-semibold text-center">
          Read More
          <Image src={assets.arrow} alt="arrow" width={12} className=" ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
