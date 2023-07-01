import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserProvider from "./contexts/UserContext";
import Another from "./components/Another";
import Test from "./components/Test";

function App() {
  return (
    <UserProvider>
      {/* <Routes> */}
      <Another />
      <Test />
      {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      {/* </Routes> */}
    </UserProvider>
  );
}

export default App;
