import axios from "axios";
import toast from "react-hot-toast";
const loginController = async (email, password) => {
  try {
    const res = await axios.post(
      "https://not-x-backend.onrender.com/api/auth/login",
      {
        email,
        password,
      }
    );

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
