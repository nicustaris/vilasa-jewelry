import apiClient from "./api-client";

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};
