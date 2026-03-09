import { assets } from "../Assets/assets";
import React from "react";
import Navbar from "./Navbar";


const Header = () => {
  return (
    <div className="py-5 px-5 md:px-12  lg:px-28">
     <Navbar/>

      <div className="text-center mb-8 mt-10">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-185 m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ipsa
          id repellat quam vitae possimus. Mollitia, laboriosam consectetur.
          Unde omnis odit vero ad excepturi vitae, obcaecati reprehenderit
          incidunt! Quam, labore!
        </p>
        <form className="flex justify-between max-w-125 scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_0px_#000000]">
          <input
            type="email"
            name=""
            placeholder="Enter Your Email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border border-black px-4 py-4 sm:px-8 active:bg-gray-600 active:text-white cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
