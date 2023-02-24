import httpRequest from "./index";

const callLikeApi = async (postId) => {
  try {
    const res = await httpRequest.patch(`post/like/${postId}`, {});
    return { data: res.data };
  } catch (err) {
    if (err?.response?.data) {
      throw new Error(JSON.stringify({ ...err.response.data }));
    } else {
      throw new Error(JSON.stringify({ message: "Something went wrong!" }));
    }
  }
};

export default callLikeApi;
