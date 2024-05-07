import axios from "axios";

const getLikes = async (token, postId) => {
  try {
    const res = await axios.get(
      `https://not-x-backend.onrender.com/api/post/${postId}/likes`,
      {
        token,
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
};
const setLike = async (token, postId) => {
  try {
    const res = await axios.post(
      `https://not-x-backend.onrender.com/api/post/${postId}/likes`,
      {
        token,
      }
    );
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};
export { getLikes, setLike };
