import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { User } from "../contexts/UserContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      setUser((prev) => ({
        ...prev,
        ign: user.ign,
        _id: user._id,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#2E3137",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontFamily: "Poppins", color: "#9AA4B8" }}>
        Welcome back
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          backgroundColor: "white",
          width: "350px",
          height: "350px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          mt: "20px",
        }}
      >
        <Typography variant="h6" sx={{ fontFamily: "Poppins", color: "black" }}>
          Login
        </Typography>
        <TextField
          id="email"
          label="E-mail"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ my: "2rem" }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          sx={{ mb: "2rem" }}
        />
        <Button
          sx={{
            backgroundColor: "#FF4654",
            color: "white",
            padding: "4px 10px",
            fontFamily: "Poppins",
            width: "30%",
            fontWeight: "400",
            "&:hover": {
              backgroundColor: "#c6000f",
            },
            border: "1px solid",
            borderColor: "white",
          }}
          type="submit"
        >
          Submit
        </Button>
        <Box
          sx={{
            paddingTop: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: "Poppins", color: "black" }}
          >
            Don't have an account?
          </Typography>
          <Button size="small" onClick={() => navigate("/signup")}>
            Sign up now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
