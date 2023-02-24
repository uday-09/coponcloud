import httpRequest from ".";

const callUnlikeApi = async (postId) => {
  try {
    const res = await httpRequest.patch(`post/unlike/${postId}`);
    return { ...res.data };
  } catch (err) {
    if (err?.response?.data) {
      throw new Error(JSON.stringify({ ...err.response.data }));
    } else {
      throw new Error(JSON.stringify({ message: "Something went wrong!" }));
    }
  }
};

export default callUnlikeApi;
