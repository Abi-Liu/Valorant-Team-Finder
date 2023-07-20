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

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  const { user, loggedIn, setUser } = useUserContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //used to create the custom Valorant font
  const theme = createTheme({
    typography: {
      fontFamily: "Raleway, Arial, Poppins",
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
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });

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
          } catch (error) {
            console.error(error);
            setError("Failed to fetch data, did you enter a real Riot ID?");
          }
        } finally {
          setLoading(false);
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
          <Route
            path="/profile/:id"
            element={loggedIn ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
