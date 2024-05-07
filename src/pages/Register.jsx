import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TwitterText from "../layouts/TwitterText";
import { useForm } from "react-hook-form";
import axios from "axios";
import handleFileUpload from "../firebase";
import toast from "react-hot-toast";
import backgroundImage from "./../assets/background.png";

export default function Register() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const imageURL = await handleFileUpload(data.image[0]);

      const res = await axios.post(
        "https://not-x-backend.onrender.com/api/auth/register",
        {
          ...data,
          image: imageURL,
        }
      );
      toast.success("Successfully registered");
      navigate("/login");
    } catch (e) {
      toast.success("something went wrong");
    } finally {
      reset();
      setLoading(false);
    }
  };
  return (
    <section className="login   dark:bg-gray-900 z-20 ">
      <div className="flex flex-col relative items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          src={backgroundImage}
          className="w-full h-full  absolute  z-[1]"
          alt="back"
        />
        <div className="w-full z-10 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="@username"
                  required=""
                  {...register("username", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", {
                    required: true,
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm file:text-white file:bg-blue-500 file:border-none file:p-2  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  {...register("image", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 "
              >
                {loading ? "registering..." : "register"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account ?
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
