import { create } from "zustand";

const UsePostStore = create((set) => ({
  postInfo: null,
  posts: [],
  setPosts: (data) => set(() => ({ posts: data })),
  setPostInfo: (data) => set(() => ({ postInfo: data })),
}));

export default UsePostStore;
