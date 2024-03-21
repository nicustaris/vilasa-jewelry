import axios from "axios";
import { base_url } from "./base_url";

const apiClient = axios.create({
  baseURL: `${base_url}/api`,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
