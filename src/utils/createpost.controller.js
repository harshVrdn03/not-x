import axios from "axios";
import API_URL from "../constant/constant";
const createPost = async (token, text, imageUrl) => {
  try {
    const res = await axios.post(`${API_URL}/api/post/createpost`, {
      token,
      text,
      imageUrl,
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export default createPost;
