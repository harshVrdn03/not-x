import axios from "axios";
import API_URL from "../constant/constant";

const getcomments = async (token, postId) => {
  try {
    const res = await axios.get(`${API_URL}/api/post/comment/${postId}`, {
      token,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default getcomments;
