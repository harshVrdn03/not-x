import React, { useEffect, useState } from "react";
import UseAuthStore from "../store/authstore";
import axios from "axios";
import Post from "../components/Post";

export default function Followings() {
  const { authUser } = UseAuthStore();
  const [followingsPost, setFollowingsPost] = useState([]);
  const followingPostHandler = async () => {
    try {
      const token = localStorage.getItem("user_token");
      if (token) {
        const res = await axios.post(
          "https://not-x-backend.onrender.com/api/post/followings",
          { token }
        );
        setFollowingsPost(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    followingPostHandler();
  }, []);
  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col ">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pl-4">
          Followings
        </h5>
      </div>
      <div></div>
      {!followingsPost.length ? (
        <div className="h-[90vh] grid place-items-center">
          You have no friends
        </div>
      ) : (
        ""
      )}

      <div className="overflow-y-scroll  flex-1">
        {followingsPost &&
          followingsPost.map((post, idx) => {
            return (
              <Post
                key={post.id}
                postId={post.id}
                content={post?.content}
                postImage={post?.imageUrl}
                username={post?.User?.username}
                userImage={post?.User.image}
                userEmail={post?.User?.email}
              />
            );
          })}
      </div>
    </div>
  );
}
