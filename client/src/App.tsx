import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserProvider from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import { styled } from "@mui/material";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <UserProvider>
      <Navbar pages={["login", "signup"]} settings={["profile"]} />
      <Offset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
