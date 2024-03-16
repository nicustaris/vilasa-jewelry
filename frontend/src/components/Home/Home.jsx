import React from "react";
import Login from "../User/Login";
import Register from "../User/Register";

const Home = () => {
  return (
    <div className="flex flex-col items-center mt-10 space-y-10">
      <h1>LOGIN</h1>
      <Login />
      <h1>REGISTER</h1>
      <Register />
    </div>
  );
};

export default Home;
