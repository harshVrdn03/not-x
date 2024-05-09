import axios from "axios";
import API_URL from "../constant/constant";

const suggestions = async (token) => {
  try {
    const res = await axios.post(`${API_URL}/api/user/suggestions`, {
      token,
    });
    return res;
  } catch (error) {
    return error;
  }
};
export default suggestions;
