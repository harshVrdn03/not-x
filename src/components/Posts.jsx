import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import UseTrigger from "../store/triggrer";
import getposts from "../utils/getposts.controller";
import UseAuthStore from "../store/authstore";
import UsePostStore from "../store/poststore";

export default function Posts({ pt }) {
  const { posts } = UsePostStore();

  return (
    <>
      {posts ? "" : "loaing..."}
      {posts &&
        posts
          .map((post, idx) => {
            return (
              <Post
                key={post.id}
                postInfo={post}
                postId={post.id}
                content={post?.content}
                postImage={post?.imageUrl}
                username={post?.User?.username}
                userImage={post?.User.image}
                userEmail={post?.User?.email}
                userId={post?.User?.id}
              />
            );
          })
          .reverse()}
    </>
  );
}
