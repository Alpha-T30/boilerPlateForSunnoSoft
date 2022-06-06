import axios from "axios";
import jwt_decode from "jwt-decode";
import { userLogout } from "../features/actions/authAsyncAction";

// PRODUCTION
// const BASE_URL = "https://netfeebd.net/api/v1/";

// DEVELOPMENT
// const BASE_URL = "http://137.184.69.182/api/v1/";

// LOCAL vai
// const BASE_URL = "http://192.168.1.26:3030/api/v1/";

const BASE_URL = "http://localhost:3030/api/v1/";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.currentUser;
// const access = user && JSON.parse(user)?.access;
// const TOKEN = access?.token;

// const userAllData = JSON.parse(localStorage.getItem("persist:root"));

// const currentUser = user && JSON.parse(user)?.currentUser;
// const TOKEN = currentUser?.access?.token;

// const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
// const TOKEN = user && JSON.parse(user)?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// const TOKEN = JSON.parse(localStorage.getItem("netFeeToken"))

const apiLink = axios.create({
  baseURL: BASE_URL,
});

// export default apiLink;

const refreshToken = async () => {
  try {
    const res = await publicRequest.post("auth/refresh-tokens");
    // console.log(res.data)
    localStorage.setItem("netFeeToken", JSON.stringify(res.data?.access.token));
    return res.data?.access.token;
  } catch (err) {
    // console.log(err)
    // console.log("logged OUt for refresh route")
    if (err) {
      userLogout();
    }
  }
};

// const axiosJWT = axios.create()

apiLink.interceptors.request.use(
  async (config) => {
    const TOKEN = await JSON.parse(localStorage.getItem("netFeeToken"));
    let currentDate = new Date();
    const decodedToken = jwt_decode(TOKEN);

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      await refreshToken();
      // config.baseURL = BASE_URL;
      const TOKEN = await JSON.parse(localStorage.getItem("netFeeToken"));

      config.headers["authorization"] = "Bearer " + TOKEN;
    } else {
      config.headers["authorization"] = "Bearer " + TOKEN;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiLink.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    // console.log(err?.response);
    // console.log(err.response?.status);
    // userLogout();
    if (err.response?.status === 401) {
      userLogout();
    }

    return Promise.reject(err);
  }
);

export default apiLink;
