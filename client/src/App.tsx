import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useUserContext } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import { styled } from "@mui/material";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  const { loggedIn } = useUserContext();

  return (
    <>
      <Navbar pages={["login", "signup"]} settings={["profile"]} />
      <Offset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!loggedIn ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!loggedIn ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
