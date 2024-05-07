import React, { useEffect, useState } from "react";
import suggestions from "../utils/suggestion.controller";
import UseAuthStore from "../store/authstore";
import followed from "../utils/followed.controller";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Suggestions() {
  const [suggestionList, setSuggestionList] = useState([]);
  const [tr, setTr] = useState(0);
  const { authUser } = UseAuthStore();
  const navigate = useNavigate();
  const suggestionHandler = async () => {
    try {
      const token = localStorage.getItem("user_token");
      if (token) {
        const res = await suggestions(token);
        setSuggestionList(res?.data);
      }
    } catch (e) {
      if (e.response.status === 401) {
        toast.error("Unauthorized");
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    suggestionHandler();
  }, [tr]);

  const followedHandler = async (followingId, followedUsername) => {
    try {
      const token = localStorage.getItem("user_token");
      console.log(followingId);
      if (token) {
        await followed(token, followingId);
        setTr((data) => data + 1);
        toast.success(`you followed ${followedUsername}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div class="  w-full  p-4  rounded-lg  sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Suggestions
          </h5>
        </div>

        {suggestionList?.length === 1 ? (
          <div className="h-[90vh] grid place-items-center">
            No user to suggest
          </div>
        ) : (
          ""
        )}

        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            {suggestionList &&
              suggestionList.map((value, idx) => {
                if (value.id !== authUser.id) {
                  return (
                    <li class="py-3 sm:py-4" key={value.id}>
                      <div class="flex items-center ">
                        <div class="flex-shrink-0">
                          <img
                            class="w-8 h-8 rounded-full"
                            src={value.image}
                            alt="Lana image"
                          />
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {value.username}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {value.email}
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <button
                            type="button"
                            onClick={() =>
                              followedHandler(value.id, value.username)
                            }
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Follow
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
