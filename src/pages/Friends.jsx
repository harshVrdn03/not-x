import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API_URL from "../constant/constant";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [tr, setTr] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();
  const friendHandler = async () => {
    try {
      setFetching(true);
      const token = localStorage.getItem("user_token");
      if (token) {
        const res = await axios.post(`${API_URL}/api/user/following`, {
          token,
        });
        console.log(res);
        setFriends(res.data.friends);
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
        toast.error("Token Expired");
      }
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => {
    friendHandler();
  }, [tr]);

  const UnfollowHandler = async (followingId, username) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("user_token");
      if (token) {
        const res = await axios.post(
          `http://localhost:8000/api/user/${followingId}/unfollowed`,
          {
            token,
          }
        );
      }
      setTr((data) => data + 1);
      toast.success(`you unfollowed ${username}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pt-5">
      <div class="flow-root max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Friends
          </h5>
        </div>

        {!friends ? (
          <div className="h-[90vh] grid place-items-center">
            You have no friends
          </div>
        ) : (
          ""
        )}
        {fetching ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {friends &&
                friends.map((value, idx) => {
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
                              UnfollowHandler(value.id, value.username)
                            }
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Unfollow
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
