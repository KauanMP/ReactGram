import { api, requestConfig } from "../utils/config";

// Publisher an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(`${api}/photos/`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserPhoto = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoServices = {
  publishPhoto,
  getUserPhoto,
};

export default photoServices;
