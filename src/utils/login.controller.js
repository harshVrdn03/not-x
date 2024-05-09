import axios from "axios";
import toast from "react-hot-toast";
import API_URL from "../constant/constant";
const loginController = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });

    return res;
  } catch (err) {
    if (err.response.status === 404) {
      toast.error("Invalid credentials");
    } else {
      toast.error("Login failed");
    }
    return err;
  }
};

export default loginController;
