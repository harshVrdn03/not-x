import { create } from "zustand";

const UseCommentStore = create((set) => ({
  commentToggle: false,
  postIdForComment: null,
  setPostIdForComment: (data) => set(() => ({ postIdForComment: data })),
  setCommentToggleOpen: (data) => set(() => ({ commentToggle: true })),
  setCommentToggleClose: () => set(() => ({ commentToggle: false })),
}));

export default UseCommentStore;
