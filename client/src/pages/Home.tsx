import { Box, Typography } from "@mui/material";
import AgentImage from "../assets/Agents.png";
import Background from "../assets/val-bg.jpg";
import "../fonts/ValorantFont.ttf";

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
        {/* <Box
          sx={{
            display: "flex",
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
            <Typography
              sx={{ color: "white", textAlign: "center" }}
              variant="h2"
            >
              Team Finder
            </Typography>
          </Box>
          <Box>
            <img
              src={AgentImage}
              alt="Valorant Background Image"
              style={{ maxWidth: "100%", height: "30rem" }}
            />
          </Box>
        </Box> */}
      </Box>
    </>
  );
};

export default Home;
