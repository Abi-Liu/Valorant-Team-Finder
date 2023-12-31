import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useUserContext } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import { styled } from "@mui/material";
import { CssBaseline, createTheme } from "@mui/material";
import Teams from "./pages/Teams";
import ValorantFont from "./fonts/ValorantFont.ttf";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import axiosInstance from "./utils/axios";
import Profile from "./pages/Profile";
import getProfileData from "./utils/GetUserData";
import Search from "./pages/Search";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  const { user, loggedIn, setLoggedIn, setUser } = useUserContext();
  const [error, setError] = useState<string>("");

  console.log(error);
  //used to create the custom Valorant font
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, Tungsten, Raleway, Arial",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Valorant';
            font-style: bold;
            font-display: swap;
            font-weight: 400;
            src: url(${ValorantFont}) format('ttf');
            unicodeRanxge: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });

  useEffect(() => {
    async function getStatus() {
      const response = await axiosInstance.get("/auth/status");
      if (response.status === 200) {
        setLoggedIn(true);
        setUser((prev) => ({
          ...prev,
          ign: response.data.ign,
          team: response.data.team,
          _id: response.data._id,
        }));
      }
    }
    getStatus();
  }, [setUser, setLoggedIn]);

  //refactored for increased reusability and readability
  useEffect(() => {
    const getUserData = async () => {
      if (loggedIn) {
        try {
          const { profileData, matchHistory } = await getProfileData(user._id);
          console.log(profileData);
          setUser((prev) => ({
            ...prev,
            puuid: profileData.data.profile.puuid,
            region: profileData.data.profile.region,
            cardLarge: profileData.data.profile.cardLarge,
            cardSmall: profileData.data.profile.cardSmall,
            rank: profileData.data.profile.rank,
            rankImage: profileData.data.profile.rankImage,
            matches: matchHistory.data.matches,
          }));
        } catch (error) {
          console.error(error);
          try {
            const profileData = await axiosInstance.post(
              "/profile/createProfile"
            );
            const matchHistory = await axiosInstance.post(
              `/matches/createMatches`,
              {
                puuid: profileData.data.puuid,
                region: profileData.data.region,
              }
            );
            setUser((prev) => ({
              ...prev,
              puuid: profileData.data.puuid,
              region: profileData.data.region,
              cardLarge: profileData.data.cardLarge,
              cardSmall: profileData.data.cardSmall,
              rank: profileData.data.rank,
              rankImage: profileData.data.rankImage,
              matches: matchHistory.data.matches,
            }));
          } catch (error: any) {
            console.error(error.response.data.message);
            setError("Failed to fetch data, did you enter a real Riot ID?");
          }
        }
      }
    };
    getUserData();
  }, [user._id, loggedIn, setUser]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navbar />
        <Offset />
        <Routes>
          <Route
            path="/"
            element={<Home error={error} setError={setError} />}
          />
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
          <Route
            path="/profile/:id"
            element={loggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={loggedIn ? <Search /> : <Navigate to="/login" />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
