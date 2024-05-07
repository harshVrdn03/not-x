import axios from "axios";

const createPost = async (token, text, imageUrl) => {
  try {
    const res = await axios.post(
      "https://not-x-backend.onrender.com/api/post/createpost",
      {
        token,
        text,
        imageUrl,
      }
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export default createPost;
