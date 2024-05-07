import React, { useEffect, useState } from "react";
import CommentsSvg from "../assets/svg/Comments-svg";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/20/solid";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import UsePostStore from "../store/poststore";
import { getLikes, setLike } from "../utils/like.controller";
import UseAuthStore from "../store/authstore";
import Loading from "./Loading";
import axios from "axios";
import UseTrigger from "../store/triggrer";
import toast from "react-hot-toast";
export default function Post({
  postInfo,
  postId,
  content,
  postImage,
  username,
  userImage,
  userEmail,
  hideComment,
  userId,
}) {
  const { setPostInfo } = UsePostStore();
  const { authUser } = UseAuthStore();
  const [likesList, setLikesList] = useState([]);
  const [loadingSt, setLoadingSt] = useState(false);
  const [loadingDl, setLoadingDl] = useState(false);
  const [liketr, setLikeTr] = useState(1);
  const { setPostTrigger } = UseTrigger();

  const navigate = useNavigate();

  const getLikesHandler = async () => {
    const token = localStorage.getItem("user_token");
    try {
      setLoadingSt(true);
      if (token && postId) {
        const res = await getLikes(token, postId);
        setLikesList(res.data);
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
        toast.error("Token Expired");
      }
    } finally {
      setLoadingSt(false);
    }
  };
  useEffect(() => {
    getLikesHandler();
  }, [liketr]);

  const submitLikes = async () => {
    const token = localStorage.getItem("user_token");
    if (token) {
      setLoadingSt(true);
      try {
        const res = await setLike(token, postId);
        setLikeTr((data) => data + 1);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/login");
          toast.error("Token Expired");
        }
      } finally {
        setLoadingSt(false);
      }
    }
  };

  const isIncluded = likesList.some((item) => item.userId === authUser.id);

  const deletePostHandler = async (postId) => {
    setLoadingDl(true);
    try {
      const token = localStorage.getItem("user_token");
      if (token) {
        const res = await axios.post(
          `https://not-x-backend.onrender.com/api/post/${postId}/delete`,
          { token }
        );
        toast.success("post deleted ");
        setPostTrigger();
        console.log(res);
      }
    } catch (e) {
      if (e.response.status === 401) {
        navigate("/login");
        toast.error("Token Expired");
      }
    } finally {
      setLoadingDl(false);
    }
  };

  return (
    <>
      <div className="flex items-start space-x-4 p-4 ">
        <img
          src={userImage}
          alt="Profile Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 ">
          <div>
            <h1 className="text-sm">{userEmail}</h1>
            <h1 className="text-[12px] text-gray-600">{username}</h1>
          </div>
          <h1 className="pt-4">{content}</h1>
          {postImage && (
            <img
              src={postImage}
              alt="bg"
              className="w-full object-cover object-center rounded-lg h-[200px] md:h-[350px]"
            />
          )}

          <div className="grid  grid-cols-3 items-center justify-around py-3">
            <div
              className="flex space-x-3 justify-center"
              onClick={submitLikes}
            >
              <div>
                {loadingSt ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    {isIncluded ? (
                      <HeartSolid className="h-[24px] cursor-pointer" />
                    ) : (
                      <HeartIcon className="h-[24px] cursor-pointer" />
                    )}
                  </>
                )}
              </div>

              {likesList.length}
            </div>
            <div className="flex space-x-3 justify-center">
              {hideComment ? (
                ""
              ) : (
                <Link
                  to={`/posts/${postId}`}
                  onClick={() => setPostInfo(postInfo)}
                >
                  <ChatBubbleBottomCenterIcon className="h-[24px] cursor-pointer" />
                </Link>
              )}
            </div>
            {console.log(authUser.id, userId)}
            <div className="flex space-x-3 justify-end px-5">
              {authUser.id === userId ? (
                <>
                  {loadingDl ? (
                    <Loading />
                  ) : (
                    <TrashIcon
                      className="h-[24px] cursor-pointer"
                      onClick={() => deletePostHandler(postId)}
                    />
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
