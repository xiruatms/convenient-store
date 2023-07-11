import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

/* global process, console */

//axios.defaults.baseURL = process.env.API_BASE_URL;
axios.defaults.timeout = 6000;
export const get = (url: string, config: AxiosRequestConfig = {}): Promise<any> =>
  new Promise((resolve) => {
    axios
      .get(url, {
        headers: config.headers,
        params: config.params,
        signal: config.signal,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
      });
  });

// post request
export const post = (url: string, data = {}): Promise<any> =>
  new Promise((resolve) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.error(error);
      });
  });

const request = axios.create();

// 异常拦截处理器
const errorHandler = (error) => {
  console.log("@@@@@", error);
  if (error.response) {
    const data = error.response.data;
    // 从 localstorage 获取 token
    // const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      console.error({
        message: "Forbidden",
        description: data.message,
      });
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      console.error({
        message: "未登录",
        description: "权限验证失败",
      });
    }
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config) => {
  const token = process.env.DEFAULT_ACCESS_TOKEN;

  if (token) {
    config.headers["Access-Token"] = token;
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
  if (!response.data.success && response.data.error && response.data.error.code === 1001) {
    console.error({
      message: "未登录",
      description: "权限验证失败",
    });
  }
  return response.data;
}, errorHandler);

export default request;

export { request as axios };
