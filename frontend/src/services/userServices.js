import apiClient from "../utils/api-client";

export const userRegister = async (user, avatar) => {
  const body = new FormData();

  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("gender", user.gender);
  body.append("file", avatar);

  await apiClient.post("/vilasa-v1/user/register", body);
};

export const userLogin = async (user) => {
  try {
    const { data } = await apiClient.post("/vilasa-v1/user/login", user);
    document.cookie = `token=${data.token}; path=/`;
  } catch (error) {
    console.log(error.message);
  }
};
