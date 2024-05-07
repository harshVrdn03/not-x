import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import UsePostStore from "../store/poststore";
import axios from "axios";
import UseAuthStore from "../store/authstore";
import createcomment from "../utils/createcomments.controller";
import getcomments from "../utils/getcomments.controller";
import UseTrigger from "../store/triggrer";
import Loading from "../components/Loading";

export default function PostC() {
  const { postInfo } = UsePostStore();
  const [token, setToken] = useState(localStorage.getItem("user_token"));
  const [loadingSt, setLoadingSt] = useState(false);
  const [loadingCmtSt, setLoadingCmtSt] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { setCommentTrigger, commentTrigger } = UseTrigger();
  // const [commentLoading, setCommentLoading] = useState(false);
  const submitComment = async () => {
    try {
      setLoadingSt(true);
      if (token) {
        await createcomment(token, comment, postInfo.id);
        setCommentTrigger();
      }
    } catch (e) {
      console.error("Error creating comment", e);
    } finally {
      setComment("");
      setLoadingSt(false);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("user_token"));
    getCommentsHandler();
  }, [commentTrigger]);

  const getCommentsHandler = async () => {
    try {
      if (token) {
        setLoadingCmtSt(true);
        const res = await getcomments(token, postInfo.id);
        setComments(res.data.comments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCmtSt(false);
    }
  };

  return (
    <div>
      <Post
        hideComment={true}
        postId={postInfo?.id}
        content={postInfo?.content}
        postImage={postInfo?.imageUrl}
        username={postInfo?.User?.username}
        userImage={postInfo?.User.image}
        userEmail={postInfo?.User?.email}
      />
      <div>
        <div className="flex max-w-lg mx-auto ">
          <input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="share your thoughts..."
            class="bg-gray-50 border border-gray-300 rounded-md text-gray-900 outline-none text-sm   block w-full p-2.5 "
          />
          <button
            onClick={submitComment}
            disabled={loadingSt}
            class="text-white bg-blue-700 hover:bg-blue-800 rounded-md focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center "
          >
            {loadingSt ? <Loading /> : "Submit"}
          </button>
        </div>

        <div>
          <div class="w-full  p-4 bg-white   rounded-lg sm:p-8 ">
            <div class="flex items-center justify-between mb-4">
              <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Comments
              </h5>
            </div>
            <div class="flow-root">
              {loadingCmtSt ? (
                <>
                  <Loading />
                </>
              ) : (
                <>
                  {" "}
                  <ul
                    role="list"
                    class="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    {comments &&
                      comments
                        .map((data, idx) => {
                          return (
                            <li class="pt-3 pb-0 sm:pt-4">
                              <div class="flex items-center ">
                                <div class="flex-shrink-0">
                                  <img
                                    class="w-8 h-8 rounded-full"
                                    src={data.user.image}
                                    alt="Thomas image"
                                  />
                                </div>
                                <div class="flex-1 min-w-0 ms-4">
                                  <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {data.comment}
                                  </p>
                                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {data.user.email}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })
                        .reverse()}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
