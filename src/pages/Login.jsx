import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginController from "../utils/login.controller";
import UseAuthStore from "../store/authstore";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import backgroundImage from "./../assets/background.png";
export default function Login() {
  const { setToken, setAuthenticated, setAuthenticateUser } = UseAuthStore();

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { email, password } = data;

      // Basic validation (optional, consider adding more robust validation on the server-side)
      if (!email || !password) {
        throw new Error("Please enter email and password.");
      }

      const res = await loginController(email, password);

      // Check for successful login response
      if (res.status !== 200) {
        throw new Error(res.data?.message || "Login failed."); // Use error message from response if available
      }

      localStorage.setItem("user_token", res.data?.token);
      setAuthenticated();
      setAuthenticateUser(res.data?.user);
      setToken(res.data?.token);
      toast.success("Logged In");
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err);
    } finally {
      reset();
      setLoading(false);
    }
  };
  return (
    <section class="bg-gray-50 dark:bg-gray-900  ">
      <div class="flex flex-col  relative  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          src={backgroundImage}
          className="w-full h-full  absolute  z-[1]"
          alt="back"
        />
        <div class="z-[10] w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: true,
                  })}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <Loading /> : "Sign in"}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link
                  to="/register"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
