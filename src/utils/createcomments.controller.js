import axios from "axios";
import API_URL from "../constant/constant";
const createcomment = async (token, comment, postId) => {
  try {
    console.log(token, comment, postId);
    const res = await axios.post(`${API_URL}/api/post/comment/${postId}`, {
      token,
      comment,
    });
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

export default createcomment;
