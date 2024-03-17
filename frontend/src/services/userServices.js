import apiClient from "../utils/api-client";

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
    setCookie("token", token, { path: "/" });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw error;
  }
};
