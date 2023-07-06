import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { User } from "../contexts/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser, setLoggedIn } = useUserContext();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, id } = event.target;
    if (value && id) {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const user: User = await axios.post(
        "http://localhost:8000/auth/login",
        formData
      );
      setLoggedIn(true);
      setUser({
        ign: user.ign,
        team: "",
        _id: user._id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
