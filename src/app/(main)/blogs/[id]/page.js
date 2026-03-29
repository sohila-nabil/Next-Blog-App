// import { assets } from "../../../../../Assets/assets";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Footer from "../../../../../components/Footer";
// const page = async ({ params }) => {
//   const { id } = await params;
//   const res = await fetch(`http://localhost:3000/api/blog/one/${id}`, {
//     cache: "no-store",
//   });
//   console.log(res);

//   const data = await res.json();
//   const blog = data.blog;

//   const stripHtml = (html) => {
//     return html?.replace(/<[^>]*>?/gm, "") || "";
//   };

//   const getExcerpt = (content, maxLength = 120) => {
//     const text = stripHtml(content);
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   return (
//     <>
//       <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
//         <div className="flex justify-between items-center">
//           <Link href={"/"}>
//             <Image
//               src={assets.logo}
//               alt="logo"
//               width={180}
//               className="w-32.5 sm:w-auto"
//             />
//           </Link>

//           <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_0px_#000000] cursor-pointer">
//             Get Started
//             <Image
//               src={assets.arrow}
//               alt="arrow"
//               width={20}
//               className="w-5 sm:w-auto"
//             />
//           </button>
//         </div>

//         <div className="text-center my-24">
//           <h1 className="text-2xl sm:text-5xl font-semibold max-w-175 mx-auto">
//             {blog?.title}
//           </h1>
//           <Image
//             src={blog?.userId?.profilePicture}
//             alt="author image"
//             width={60}
//             height={60}
//             className="mx-auto mt-6 rounded-full border border-white"
//           />
//           <p className="mt-1 pb-2 max-w-185 m-auto text-lg sm:text-base mx-auto">
//             {blog?.userId?.username}
//           </p>
//         </div>
//       </div>
//       <div className="mx-5 max-w-200 md:mx-auto -mt-25 mb-10">
//         <Image
//           src={blog?.image.url}
//           alt="blog image"
//           width={1280}
//           height={720}
//           className="border-4 border-white"
//         />
//         <h1 className="my-8 text-[26px] font-semibold">Introduction: </h1>
//         <p className=""> {getExcerpt(blog?.description)}</p>

//         <div className="my-4">
//           <p className="text-black font-semibold my-4 ">
//             Share this articel on social media
//           </p>
//           <div className="flex">
//             <Image src={assets.facebook_icon} width={50} alt="facebook_icon" />
//             <Image src={assets.twitter_icon} width={50} alt="facebook_icon" />
//             <Image
//               src={assets.googleplus_icon}
//               width={50}
//               alt="facebook_icon"
//             />
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default page;

// // nsohila03_db_user
// // S4bVcUVG4k0pN2dS

import Footer from "../../../../../components/Footer";
import BlogContent from "../../../../../components/BlogContent";

export default async function BlogPage({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/blog/one/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  const blog = data.blog;

  return (
    <>
      <BlogContent blog={blog} />
      <Footer />
    </>
  );
}
