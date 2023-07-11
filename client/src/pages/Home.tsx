import { Box, Button, Typography, createTheme } from "@mui/material";
import Background from "../assets/background.jpg";
import Jett from "../assets/val-jett.jpg";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { loggedIn } = useUserContext();

  return (
    <>
      <Box>
        {/* hero section for medium to large screens */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "relative",
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
              <Typography
                sx={{
                  fontSize: "2rem",
                  textAlign: "center",
                  color: "#FC3C4D",
                  fontFamily: "Valorant",
                  lineHeight: ".5",
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
                  fontSize: "7rem",
                  lineHeight: "1",
                }}
                variant="h2"
              >
                TEAM FINDER
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            // bottom: "0rem",
            left: "0rem",
            height: "40rem",
            backgroundImage: `url(${Jett})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box sx={{ width: "40%", ml: "auto", py: "8rem", mr: "2rem" }}>
            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontFamily: "Tungsten",
                fontWeight: "bold",
                fontSize: "5rem",
              }}
            >
              Find Your Dream Team
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontFamily: "Poppins",
                fontWeight: "400",
              }}
            >
              Join a vast network of like minded gamers, who are ready to take
              their skills to the next level. Find teammates based on their
              preferred roles and agents, or by rank to form the perfect team.
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loggedIn ? (
              <Button
                onClick={() => navigate("/teams")}
                sx={{
                  backgroundColor: "#FF4654",
                  color: "white",
                  padding: "8px 15px",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "#c6000f",
                  },
                  border: "1px solid",
                  borderColor: "white",
                }}
              >
                Get Started
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  backgroundColor: "#FF4654",
                  color: "white",
                  padding: "8px 15px",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "#c6000f",
                  },
                  border: "1px solid",
                  borderColor: "white",
                }}
              >
                Join Now
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
