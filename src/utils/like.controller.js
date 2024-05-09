import axios from "axios";
import API_URL from "../constant/constant";

const getLikes = async (token, postId) => {
  try {
    const res = await axios.get(`${API_URL}/api/post/${postId}/likes`, {
      token,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};
const setLike = async (token, postId) => {
  try {
    const res = await axios.post(`${API_URL}/api/post/${postId}/likes`, {
      token,
    });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};
export { getLikes, setLike };
