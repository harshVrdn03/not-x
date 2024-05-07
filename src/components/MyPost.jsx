import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UseAuthStore from "../store/authstore";
import handleFileUpload from "../firebase";
import axios from "axios";
import UseTrigger from "../store/triggrer";
import createPost from "../utils/createpost.controller";
import getposts from "../utils/getposts.controller";
import UsePostStore from "../store/poststore";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MyPost({ setPT }) {
  const authuser = UseAuthStore((state) => state.authUser);
  const { setPosts } = UsePostStore();
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const token = localStorage.getItem("user_token");
  const { setPostTrigger, postTrigger } = UseTrigger();
  const [image, setImage] = useState();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { text } = data;
    setLoadingSubmit(true);
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await handleFileUpload(image);
        await createPost(token, text, imageUrl);
      } else {
        await createPost(token, text, "");
      }
      toast.success("post created successfully");
      await postsHandler();
    } catch (e) {
      if (e.response.status === 401) {
        navigate("/login");
        toast.error("Token Expired");
      }
    } finally {
      reset();
      setLoadingSubmit(false);
    }
  };

  //handle post useEffect
  const postsHandler = async () => {
    try {
      setLoading(true);
      const res = await getposts(token);
      console.log(res.data.posts, "mypost");
      setPosts(res.data.posts);
    } catch (e) {
      if (e.response.status === 401) {
        navigate("/login");
        toast.error("Token Expired");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    postsHandler();
  }, [postTrigger]);
  return (
    <div className="flex items-start space-x-4 p-4 ">
      <img
        src={authuser?.image}
        alt="Profile Avatar"
        className="w-12 h-12 rounded-full"
      />
      <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("text")}
          placeholder="What's happening?"
          className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
        ></textarea>
        <div className="flex  w-full  mt-2">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-2 w-full   block file:bg-blue-500 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white  disabled:opacity-60"
          />
          <button
            type="submit"
            className="px-4  mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {loadingSubmit ? <Loading /> : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
