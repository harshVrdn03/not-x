import axios from "axios";

const suggestions = async (token) => {
  try {
    const res = await axios.post(
      "https://not-x-backend.onrender.com/api/user/suggestions",
      {
        token,
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};
export default suggestions;
