import { Box, Typography } from "@mui/material";
import BackgroundImage from "../assets/Valorant1.png";
import "../fonts/ValorantFont.ttf";

const Home = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#101823",
          pl: "5rem",
        }}
      >
        <Box sx={{ pt: "12rem", width: "35%" }}>
          <Typography
            className="valorant-font"
            sx={{ fontSize: "50px", textAlign: "center", color: "#ff3948" }}
            variant="h3"
          >
            Valorant
          </Typography>
          <Typography sx={{ color: "white" }} variant="h2">
            Team Finder
          </Typography>
        </Box>
        <Box>
          <img
            src={BackgroundImage}
            alt="Valorant Background Image"
            style={{ maxWidth: "100%", height: "25rem" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
