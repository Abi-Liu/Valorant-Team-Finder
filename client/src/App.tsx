import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div>
        <h2>Register</h2>
        <Register />
      </div>
      <div>
        <h2>Login</h2>
        <Login />
      </div>
    </>
  );
}

export default App;
