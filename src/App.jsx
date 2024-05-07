import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";
import Suggestion from "./pages/Suggestion";
import Profile from "./pages/Profile";
import Bookmark from "./pages/Bookmark";
import PostC from "./pages/Post";
import Followings from "./pages/Followings";
import Friends from "./pages/Friends";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/followings" element={<Followings />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/posts/:postId" element={<PostC />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/suggestions" element={<Suggestion />} />
      </Route>
    </Routes>
  );
}
