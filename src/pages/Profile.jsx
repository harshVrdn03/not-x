import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Posts from "../components/Posts";
import axios from "axios";
import Post from "../components/Post";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const myPostsHandler = async () => {
    try {
      const token = localStorage.getItem("user_token");
      if (token) {
        const res = await axios.post(
          "https://not-x-backend.onrender.com/api/post/myposts",
          {
            token,
          }
        );
        setPosts(res.data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    myPostsHandler();
  }, []);
  return (
    <div className="  max-w-6xl mx-auto h-screen overflow-y-scroll px-4">
      <ProfileCard />

      <div className="pt-24 md:pt-32" />
      {posts.length === 0 ? "No posts" : ""}
      <div className="overflow-y-scroll  flex-1">
        {posts &&
          posts.map((post) => {
            console.log(post);
            return (
              <Post
                postInfo={post}
                key={post.id}
                postId={post.id}
                content={post?.content}
                postImage={post?.imageUrl}
                username={post?.User?.username}
                userImage={post?.User.image}
                userEmail={post?.User?.email}
                // userId={post?.User?.id}
              />
            );
          })}
      </div>
    </div>
  );
}
