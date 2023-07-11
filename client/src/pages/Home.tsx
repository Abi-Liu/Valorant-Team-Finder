import { Box, Typography, createTheme } from "@mui/material";
import AgentImage from "../assets/Agents.png";
import Background from "../assets/val-bg.jpg";
import ValorantFont from "../fonts/ValorantFont.ttf";
import { ThemeProvider } from "@emotion/react";

const Home = () => {
  //used to create the custom Valorant font
  const theme = createTheme({
    typography: {
      fontFamily: "Raleway, Arial",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Valorant';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(${ValorantFont}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });
  return (
    <>
      <Box></Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          width: "100%",
          height: "35rem",
          backgroundImage: `url(${Background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            display: "flex",
            pl: "5rem",
          }}
        >
          <Box sx={{ pt: "12rem", width: "35%" }}>
            {/* consuming the theme provider to use the custom valorant font */}
            <ThemeProvider theme={theme}>
              <Typography
                sx={{
                  fontSize: "50px",
                  textAlign: "center",
                  color: "#ff3948",
                  fontFamily: "Valorant",
                }}
                variant="h3"
              >
                Valorant
              </Typography>
            </ThemeProvider>
            <Typography
              sx={{ color: "white", textAlign: "center" }}
              variant="h2"
            >
              Team Finder
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
