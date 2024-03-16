import React, { useState } from "react";
import { userRegister } from "../../services/userServices";

const Register = () => {
  const [userAvatar, setUserAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userRegister(formData, userAvatar);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input type="text" name="name" onChange={handleChange} />
        <input type="email" name="email" onChange={handleChange} />
        <input type="password" name="password" onChange={handleChange} />
        <select onChange={handleChange} name="gender">
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="file"
          name="file"
          onChange={(e) => setUserAvatar(e.target.files[0])}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
