import apiClient from "../utils/api-client";
import { jwtDecode } from "jwt-decode";

export const userRegister = async (user, avatar) => {
  try {
    const body = new FormData();
    body.append("name", user.name);
    body.append("email", user.email);
    body.append("password", user.password);
    body.append("gender", user.gender);
    body.append("file", avatar);

    await apiClient.post("/vilasa-v1/user/register", body);
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};

export const userLogin = async (user, setCookie) => {
  try {
    const { data } = await apiClient.post("/vilasa-v1/user/login", user);
    const token = data.token;
    localStorage.setItem("token", token);
    // setCookie("token", token, { path: "/" });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw error;
  }
};

export const getUser = () => {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    console.log(error);
  }
};
