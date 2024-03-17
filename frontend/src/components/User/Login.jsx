import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { userLogin } from "../../services/userServices";

const Login = () => {
  const [cookie, setCookie] = useCookies(["token"]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userLogin(userData, setCookie);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input type="email" name="email" onChange={handleChange} />
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
