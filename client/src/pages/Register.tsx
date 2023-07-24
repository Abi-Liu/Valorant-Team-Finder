import React, { ChangeEvent, useState } from "react";
import axiosInstance from "../utils/axios";
import { useUserContext } from "../contexts/UserContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

const Register = () => {
  const [formData, setFormData] = useState({
    ign: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const { setLoggedIn, setUser } = useUserContext();

  function handleRender() {
    setError("");
  }

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
      const user = await axiosInstance.post("/auth/register", formData);
      setLoggedIn(true);
      setUser((prev) => ({
        ...prev,
        ign: user.data.ign,
        team: user.data.team,
        _id: user.data._id,
      }));
    } catch (err: any) {
      setError(err.response.data.message);
      throw new Error(err.response.data.message);
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
        Create Your Account
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          backgroundColor: "white",
          width: "350px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: "20px",
        }}
      >
        {error ? (
          <CustomAlert
            severity="error"
            duration={5000}
            message={error}
            onRender={handleRender}
          />
        ) : (
          ""
        )}
        <Typography variant="h6" sx={{ fontFamily: "Poppins", color: "black" }}>
          Signup
        </Typography>
        <TextField
          id="email"
          label="E-mail"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ my: "1rem" }}
        />
        <TextField
          helperText="include your tag. i.e Bob#NA1"
          id="ign"
          label="In-game Name"
          type="text"
          value={formData.ign}
          onChange={handleChange}
          sx={{ my: "1rem" }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          sx={{ my: "1rem" }}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          sx={{ my: "1rem" }}
        />
        {formData.ign.includes("#") ? (
          <Button
            variant="contained"
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
        ) : (
          <Button
            disabled
            variant="contained"
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
        )}
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
            Already have an account?
          </Typography>
          <Button size="small" onClick={() => navigate("/login")}>
            Log in now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
