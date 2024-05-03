import axios from "axios";
import TokenService from "./token.service";


let URL = "http://localhost:3000";

const apiResource = () => {
  const api = axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": URL,
      "Access-Control-Allow-Credentials": true,
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (!token) return config;
      config.headers.Authorization = token;
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    async (error) => {
      if (error?.response?.status === 403) {
        TokenService.removeUser();
        window.location = "/";
      } else if (error?.response?.status === 401) {
        // call refresh token
        TokenService.removeUser();
        window.location = "/";
        const originalConfig = error.config;
        if (
          originalConfig.url !== "/login" &&
          error?.response
        ) {
          // Access Token was expired
          if (error.response.status === 400 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
              const rs = await api.post("/api/v1/authenticate/refreshtoken", {
                refreshToken: TokenService.getLocalRefreshToken(),
              });
              const { accessToken } = rs.data;
              TokenService.updateLocalAccessToken(accessToken);
              return api(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error?.response);
        });
      }
      return Promise.reject(error?.response);
    }
  );

  return {
    get: (url) => api.get(url).then(({ data }) => data),
    post: (values) => {
      const [url, form] = values;
      return api.post(url, form).then(({ data }) => data);
    },
    put: (values) => {
      const [url, form] = values;
      return api.put(url, form).then(({ data }) => data);
    },
    delete: (url) => api.delete(url).then(({ data }) => data)
  };
};

export const api = apiResource();

