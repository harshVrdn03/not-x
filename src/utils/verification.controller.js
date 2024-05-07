import axios from "axios";

const verificationController = async (token) => {
  try {
    const res = axios.post(
      "https://not-x-backend.onrender.com/api/auth/verification",
      {
        token,
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};
export default verificationController;
