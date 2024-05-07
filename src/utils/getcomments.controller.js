import axios from "axios";

const getcomments = async (token, postId) => {
  try {
    const res = await axios.get(
      `https://not-x-backend.onrender.com/api/post/comment/${postId}`,
      {
        token,
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default getcomments;
