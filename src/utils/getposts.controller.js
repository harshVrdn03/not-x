import axios from "axios";

const getposts = async (token) => {
  try {
    const res = await axios.get(
      "https://not-x-backend.onrender.com/api/post/getposts",
      {
        token,
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
};
export default getposts;
