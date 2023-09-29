import { api, requestConfig } from "../utils/config";

// Publisher an user photo
const publisherPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await requestConfig(`${api}/photos/`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoServices = {
  publisherPhoto,
};

export default photoServices;
