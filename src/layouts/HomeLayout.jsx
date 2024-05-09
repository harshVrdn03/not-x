import React, { useEffect } from "react";
import { useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import UseAuthStore from "../store/authstore";
import axios from "axios";
import verificationController from "../utils/verification.controller";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const NavbarData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Followings",
    link: "/followings",
  },
  {
    title: "Friends",
    link: "/friends",
  },
  {
    title: "Suggestion",
    link: "/suggestions",
  },
  {
    title: "Profile",
    link: "/profile",
  },
];

export default function HomeLayout() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const [loadingHome, setLoadingHome] = useState();
  const [showNavbar, setShowNavbar] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("user_token") || "");
  const { setAuthenticated, setAuthenticateUser, setUnAuthenticated } =
    UseAuthStore();
  const navigate = useNavigate();
  const verifyhandler = async () => {
    setLoadingHome(true);
    if (!token) navigate("/login");
    try {
      const res = await verificationController(token);
      setAuthenticated();
      toast.success("welcome");
      setAuthenticateUser(res.data.user);
    } catch (e) {
      if (e.response.status === 401) {
        toast.error("Unauthorized");
        navigate("/login");
      }
      navigate("/login");
    } finally {
      setLoadingHome(false);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("user_token"));
    verifyhandler();
  }, []);

  const signOutHandler = async () => {
    localStorage.removeItem("user_token");
    toast.success("signed out");
    await setUnAuthenticated();
  };
  if (loadingHome) {
    return (
      <div className="h-screen grid place-items-center">
        <Loading style={"scale-[3]"} />
      </div>
    );
  } else {
    return (
      <>
        <div className="inline-flex items-center  p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
        </div>

        <aside
          id="separator-sidebar"
          class={`fixed top-0 left-0 z-40 w-52 h-screen transition-transform bg-green-800 -translate-x-full ${
            showNavbar ? "sm:translate-x-0" : "translate-x-0"
          }`}
          aria-label="Sidebar"
        >
          <div
            className={`absolute top-5  z-20 bg-gray-100 p-2 rounded-md sm:hidden ${
              showNavbar ? "-right-10" : "-right-5"
            }  `}
            onClick={() => setShowNavbar(!showNavbar)}
          >
            {showNavbar ? (
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            )}
          </div>
          <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 relative">
            <ul class="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700 group"
                >
                  <span class="text-lg font-bold">not X</span>
                </a>
              </li>
            </ul>
            <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              {NavbarData.map((data, idx) => {
                return (
                  <li
                    key={idx}
                    className={` rounded-lg ${
                      currentUrl === data.link
                        ? "bg-blue-800  text-white "
                        : "hover:bg-blue-50"
                    }`}
                  >
                    <Link
                      to={data.link}
                      class={`flex items-center p-2  transition duration-75 rounded-lg   group`}
                    >
                      <span class="ms-3">{data.title}</span>
                    </Link>
                  </li>
                );
              })}

              <Link
                to="/login"
                class="flex items-center p-2   space-x-4 transition duration-75 rounded-lg bg-red-500 text-white"
                onClick={signOutHandler}
              >
                <span class="ms-3">Sign Out</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
              </Link>
            </ul>
          </div>
        </aside>

        <div class="py-4 pt-8 sm:ml-52 max-h-screen  overflow-hidden ">
          <Outlet />
        </div>
      </>
    );
  }
}
