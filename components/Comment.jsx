"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineTrash,
  HiOutlineEmojiHappy,
  HiOutlinePaperAirplane,
  HiOutlineDotsVertical,
  HiOutlineFlag,
} from "react-icons/hi";
// import { formatDistanceToNow } from "date-fns";

const Comment = ({ blog, user }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog.comments || []);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_BACKEND_URL_PRODUCTION}/api/comments/${blog._id}`,
        );
        const data = await res.json();
        if (data.success) {
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [blog._id]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_BACKEND_URL_PRODUCTION}/api/blog/comment/${blog._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: comment,
            user: user?.publicMetadata?.userMongoId,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setComments(data.blog.comments);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const res = await fetch(`/api/comments/like/${commentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.publicMetadata?.userMongoId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Update local state
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, likes: data.likes, isLiked: data.isLiked }
              : comment,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_BACKEND_URL_PRODUCTION}/api/comments/delete/${blog._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          userId: user?.publicMetadata?.userMongoId,
          commentId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setComments((prevComments) =>
          prevComments.filter((c) => c._id !== commentId),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReply = async (parentCommentId) => {
    if (!replyText.trim()) return;

    try {
      const res = await fetch(`/api/comments/reply/${parentCommentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: replyText,
          user: user?.publicMetadata?.userMongoId,
          blogId: blog._id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
        setReplyText("");
        setReplyingTo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isCommentOwner = (commentUserId) => {
    return commentUserId === user?.publicMetadata?.userMongoId;
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Comments ({comments.length})
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button className="hover:text-blue-600 transition-colors">
            Newest first
          </button>
          <span>•</span>
          <button className="hover:text-blue-600 transition-colors">
            Oldest first
          </button>
        </div>
      </div>

      {/* Add Comment Section */}
      <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <Image
              width={48}
              height={48}
              className="rounded-full ring-2 ring-white shadow-sm"
              src={user?.imageUrl || "https://i.pravatar.cc/150"}
              alt="user"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <div className="flex-1">
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                  <HiOutlineEmojiHappy className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !comment.trim()}
                className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <HiOutlinePaperAirplane className="w-4 h-4" />
                    <span>Post Comment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No comments yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((item, index) => (
            <div
              key={item._id || index}
              className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      width={44}
                      height={44}
                      className="rounded-full ring-2 ring-white shadow-sm object-cover"
                      src={
                        item?.user?.profilePicture ||
                        "https://i.pravatar.cc/150"
                      }
                      alt={item?.user?.username || "User"}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">
                        {item?.user?.username || "Anonymous"}
                      </p>
                      {item?.user?.isVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Comment Actions Menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowMenu(showMenu === item._id ? null : item._id)
                    }
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <HiOutlineDotsVertical className="w-4 h-4" />
                  </button>

                  {showMenu === item._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-10">
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <HiOutlineFlag className="w-4 h-4" />
                        Report comment
                      </button>
                      {isCommentOwner(item?.user?._id) && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                          Delete comment
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Comment Content */}
              <div className="ml-0 pl-0 md:ml-12 md:pl-3">
                <p className="text-gray-700 leading-relaxed">{item.text}</p>

                {/* Comment Actions */}
                <div className="flex items-center gap-4 mt-3">
                  <button
                    onClick={() => handleLike(item._id)}
                    className={`flex items-center gap-1.5 text-sm transition-all ${
                      item.isLiked
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    {item.isLiked ? (
                      <HiHeart className="w-4 h-4 fill-current" />
                    ) : (
                      <HiOutlineHeart className="w-4 h-4" />
                    )}
                    <span>{item.likes?.length || 0}</span>
                  </button>

                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === item._id ? null : item._id)
                    }
                    className="text-sm text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply Form */}
                {/* {replyingTo === item._id && (
                  <div className="mt-4 pl-4 border-l-2 border-blue-200">
                    <div className="flex items-start gap-2">
                      <Image
                        width={32}
                        height={32}
                        className="rounded-full"
                        src={user?.imageUrl || "https://i.pravatar.cc/150"}
                        alt="user"
                      />
                      <div className="flex-1">
                        <textarea
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder={`Reply to ${item?.user?.username}...`}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={2}
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleReply(item._id)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

                {/* Nested Replies */}
                {/* {item.replies && item.replies.length > 0 && (
                  <div className="mt-4 pl-4 space-y-3">
                    {item.replies.map((reply, replyIndex) => (
                      <div
                        key={replyIndex}
                        className="bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Image
                              width={28}
                              height={28}
                              className="rounded-full"
                              src={
                                reply?.user?.profilePicture ||
                                "https://i.pravatar.cc/150"
                              }
                              alt={reply?.user?.username}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {reply?.user?.username}
                              </p>
                              <p className="text-xs text-gray-400">
                                {formatDate(reply.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-2 ml-9">
                          {reply.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
