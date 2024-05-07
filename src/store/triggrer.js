import { create } from "zustand";

const UseTrigger = create((set) => ({
  postTrigger: 1,
  commentTrigger: 1,
  setPostTrigger: () =>
    set((state) => ({ postTrigger: state.postTrigger + 1 })),
  setCommentTrigger: () =>
    set((state) => ({ commentTrigger: state.commentTrigger + 1 })),
}));

export default UseTrigger;
