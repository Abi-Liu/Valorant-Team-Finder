import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useUserContext } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import { styled } from "@mui/material";
import { CssBaseline } from "@mui/material";
import Teams from "./pages/Teams";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  const { loggedIn } = useUserContext();
  console.log(loggedIn);
  return (
    <>
      <CssBaseline />
      <Navbar />
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
        <Route
          path="/teams"
          element={loggedIn ? <Teams /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
