import axios from "axios";
import apiClient from "./api-client";

export const setAuthToken = (token) => {
  // if (token) {
  //   axios.defaults.headers.common["x-auth-token"] = token;
  //   // const config = {
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     Authorization: `Bearer ${token}`,
  //   //   },
  //   // };
  // } else {
  //   delete axios.defaults.headers.common["Authorization"];
  // }
  if (token) {
    // If token exists, set it in the headers along with Content-Type
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // If token is null or undefined, remove it from headers
    delete axios.defaults.headers.common["Authorization"];
  }
};
