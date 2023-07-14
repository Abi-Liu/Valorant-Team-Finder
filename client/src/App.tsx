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
import { useEffect } from "react";
import axiosInstance from "./utils/axios";
import { MatchArrayResponse, ProfileResponse } from "./interfaces/Response";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  const { user, loggedIn, setUser } = useUserContext();
  console.log(user);
  console.log(loggedIn);

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

  useEffect(() => {
    const getUserData = async () => {
      if (loggedIn) {
        let profileData = (await axiosInstance.get(
          `/profile/${user._id}`
        )) as ProfileResponse;
        let matchHistory = (await axiosInstance.get(
          `/matches/${user._id}`
        )) as MatchArrayResponse;

        console.log(profileData);
        console.log(matchHistory);
        if (profileData && matchHistory) {
          setUser((prev) => ({
            ...prev,
            puuid: profileData.puuid,
            region: profileData.region,
            cardLarge: profileData.cardLarge,
            cardSmall: profileData.cardSmall,
            rank: profileData.rank,
            rankImage: profileData.rankImage,
            matches: matchHistory.matches,
          }));
        } else {
          profileData = (await axiosInstance.post(
            "/profile/createProfile"
          )) as ProfileResponse;
          matchHistory = (await axiosInstance.post(`/matches/createMatches}`, {
            puuid: profileData.puuid,
            region: profileData.region,
          })) as MatchArrayResponse;
          setUser((prev) => ({
            ...prev,
            puuid: profileData.puuid,
            region: profileData.region,
            cardLarge: profileData.cardLarge,
            cardSmall: profileData.cardSmall,
            rank: profileData.rank,
            rankImage: profileData.rankImage,
            matches: matchHistory.matches,
          }));
        }
      }
    };
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, loggedIn]);

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
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
