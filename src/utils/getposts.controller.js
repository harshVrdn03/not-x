import axios from "axios";
import API_URL from "../constant/constant";

const getposts = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/api/post/getposts`, {
      token,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};
export default getposts;
