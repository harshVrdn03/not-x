import React, { useState } from "react";
import MyPost from "../components/MyPost";
import Suggestions from "../components/Suggestions";
import Posts from "../components/Posts";

export default function Home() {
  return (
    <div className="flex   h-screen ">
      <div className="flex-1  overflow-y-scroll ">
        <MyPost />
        <Posts />
      </div>
      <div className=" lg:min-w-[25%] lg:block hidden max-h-screen   ">
        <Suggestions />
      </div>
    </div>
  );
}
