import React from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import UseAuthStore from "../store/authstore";
export default function ProfileCard() {
  const { authUser } = UseAuthStore();
  return (
    <div class="w-full   relative dark:bg-gray-800 dark:border-gray-700 h-[150px] md:h-[200px] ">
      <div className="w-full h-full overflow-hidden rounded-md">
        <img
          src={authUser?.image}
          alt="img"
          srcset=" "
          className="w-full  h-full object-center "
        />
      </div>
      <div class="w-24  h-24  rounded-full shadow-lg absolute -bottom-16 left-10  z-20 ">
        <div className="w-full h-full overflow-hidden  rounded-full border-4 border-blue-800">
          <img
            src={authUser?.image}
            alt="img"
            srcset=" "
            className="w-full h-full object-cover "
          />
        </div>
      </div>
      <div className="mt-16 pl-8">
        <div className=" ">{authUser?.email}</div>
        <div className="  text-gray-500"> {authUser?.username}</div>
      </div>
    </div>
  );
}
