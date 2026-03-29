"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineCalendar,
  HiOutlineChevronDown,
  HiOutlineX,
} from "react-icons/hi";
import axios from "axios";
import Navbar from "../../../../components/Navbar";


const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_BACKEND_URL_PRODUCTION}/api/blog/all`,
        );
        console.log(res.data);

        setBlogs(res.data.blogs);
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    let filtered = [...blogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.userId?.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          blog.userId?.userName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((blog) =>
        selectedCategories.includes(blog.category),
      );
    }

    // Author filter
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((blog) =>
        selectedAuthors.includes(blog.userId?.username),
      );
    }

    // Sort
    if (sortBy === "latest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "mostViewed") {
      filtered.sort((a, b) => b.views - a.views);
    }

    return filtered;
  }, [blogs, searchTerm, selectedCategories, selectedAuthors, sortBy]);
  const authors = [...new Set(blogs.map((blog) => blog?.userId?.username))];

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleAuthorToggle = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author],
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAuthors([]);
    setSearchTerm("");
    setSortBy("latest");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getExcerpt = (content, maxLength = 120) => {
    const text = stripHtml(content);
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Blog Posts
            </h1>
            <p className="text-gray-500 mt-2">
              Discover articles from our community
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <HiOutlineFilter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Filters</span>
                {(selectedCategories.length > 0 ||
                  selectedAuthors.length > 0) && (
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                    {selectedCategories.length + selectedAuthors.length}
                  </span>
                )}
              </div>
              <HiOutlineChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <div
              className={`lg:w-80 shrink-0 ${isFilterOpen ? "block" : "hidden lg:block"}`}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24">
                {/* Search */}
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Search
                  </h3>
                  <div className="relative">
                    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search blogs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Sort By
                  </h3>
                  <div className="space-y-2">
                    {[
                      { value: "latest", label: "Latest First" },
                      { value: "oldest", label: "Oldest First" },
                      { value: "mostViewed", label: "Most Viewed" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="sort"
                          value={option.value}
                          checked={sortBy === option.value}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="p-5 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Categories
                    </h3>
                    {selectedCategories.length > 0 && (
                      <button
                        onClick={() => setSelectedCategories([])}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                          {category}
                        </span>
                        <span className="ml-auto text-xs text-gray-400">
                          {
                            blogs.filter((blog) => blog.category === category)
                              .length
                          }
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Authors Filter */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Authors
                    </h3>
                    {selectedAuthors.length > 0 && (
                      <button
                        onClick={() => setSelectedAuthors([])}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {authors.map((author) => (
                      <label
                        key={author}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedAuthors.includes(author)}
                          onChange={() => handleAuthorToggle(author)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                          {author}
                        </span>
                        <span className="ml-auto text-xs text-gray-400">
                          {
                            blogs.filter((blog) => blog?.userId === author)
                              .length
                          }
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear All Filters */}
                {(selectedCategories.length > 0 ||
                  selectedAuthors.length > 0 ||
                  searchTerm) && (
                  <div className="p-5 pt-0">
                    <button
                      onClick={clearAllFilters}
                      className="w-full px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content - Blog Grid */}
            <div className="flex-1">
              {/* Results Info */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredBlogs.length}
                  </span>{" "}
                  results
                </p>
                <div className="lg:hidden">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-blue-600 text-sm"
                  >
                    Done
                  </button>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 ||
                selectedAuthors.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {category}
                      <button
                        onClick={() => handleCategoryToggle(category)}
                        className="hover:text-blue-900"
                      >
                        <HiOutlineX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedAuthors.map((author) => (
                    <span
                      key={author}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {author}
                      <button
                        onClick={() => handleAuthorToggle(author)}
                        className="hover:text-purple-900"
                      >
                        <HiOutlineX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Blog Grid */}
              {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredBlogs.map((blog) => (
                    <article
                      key={blog._id}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                    >
                      {/* Image */}
                      <Link
                        href={`/blogs/${blog._id}`}
                        className="block relative overflow-hidden h-48"
                      >
                        <Image
                          src={blog.image.url}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium rounded-full">
                            {blog.category}
                          </span>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-5">
                        {/* Author & Date */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
                              <Image
                                src={blog.userId?.profilePicture}
                                alt={blog.userId?.username}
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {blog.userId?.username}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">•</span>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <HiOutlineCalendar className="w-3 h-3" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <Link href={`/blogs/${blog._id}`}>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                        </Link>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {getExcerpt(blog.description)}
                        </p>

                        {/* Footer */}
                        {/* <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <HiOutlineClock className="w-3 h-3" />
                            <span>{blog.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HiOutlineUser className="w-3 h-3" />
                            <span>{blog.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <HiOutlineBookmark className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <HiOutlineShare className="w-4 h-4" />
                          </button>
                        </div>
                      </div> */}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                // Empty State
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <HiOutlineSearch className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No blogs found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
