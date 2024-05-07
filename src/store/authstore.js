import { create } from "zustand";

const UseAuthStore = create((set) => ({
  isAuthenticated: false,
  authUser: null,
  token: null,
  setAuthenticateUser: (data) => set(() => ({ authUser: data })),
  setAuthenticated: () => set(() => ({ isAuthenticated: true })),
  setToken: (data) => set(() => ({ token: data })),
  setUnAuthenticated: (data) =>
    set(() => ({ isAuthenticated: false, token: null, authUser: null })),
}));

export default UseAuthStore;
