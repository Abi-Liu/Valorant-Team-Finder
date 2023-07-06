import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useUserContext, User } from "../contexts/UserContext";

const Register = () => {
  const [formData, setFormData] = useState({
    ign: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setLoggedIn, setUser } = useUserContext();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, id } = event.target;
    if (value && id) {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const user: User = await axios.post(
        "http://localhost:8000/auth/register",
        formData
      );
      setLoggedIn(true);
      setUser((prev) => ({
        ...prev,
        ign: user.ign,
        _id: user._id,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="ign"
          value={formData.ign}
          onChange={handleChange}
          placeholder="Bob#NA1"
        />
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="valorant@riot.com"
        />
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="******"
        />
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="******"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
