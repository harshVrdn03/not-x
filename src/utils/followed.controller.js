import axios from "axios";
import API_URL from "../constant/constant";

const followed = async (token, followingId) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/user/${followingId}/followed`,
      {
        token,
        followingId,
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
export default followed;
