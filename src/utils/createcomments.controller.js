import axios from "axios";

const createcomment = async (token, comment, postId) => {
  try {
    console.log(token, comment, postId);
    const res = await axios.post(
      `https://not-x-backend.onrender.com/api/post/comment/${postId}`,
      {
        token,
        comment,
      }
    );
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

export default createcomment;
