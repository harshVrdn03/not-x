import axios from "axios";
import API_URL from "../constant/constant";

const verificationController = async (token) => {
  try {
    const res = axios.post(`${API_URL}/api/auth/verification`, {
      token,
    });
    return res;
  } catch (err) {
    return err;
  }
};
export default verificationController;
