import axios from "axios";

const followed = async (token, followingId) => {
  try {
    const res = await axios.post(
      `https://not-x-backend.onrender.com/api/user/${followingId}/followed`,
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
