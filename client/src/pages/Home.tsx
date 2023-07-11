import { Box, Typography, createTheme } from "@mui/material";
import AgentImage from "../assets/Agents.png";
import Background from "../assets/val-bg.jpg";

const Home = () => {
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

            <Typography
              sx={{
                fontSize: "2rem",
                textAlign: "center",
                color: "#FC3C4D",
                fontFamily: "Valorant",
              }}
              variant="h3"
            >
              VALORANT
            </Typography>

            <Typography
              sx={{
                color: "#EEE8E2",
                textAlign: "center",
                fontFamily: "Tungsten",
                fontWeight: "bold",
                fontSize: "8rem",
              }}
              variant="h2"
            >
              TEAM FINDER
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
