import { Box, Button, Typography } from "@mui/material";
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
            display: { md: "block" },
            position: "relative",
            width: "100%",
            height: "35rem",
            backgroundImage: `url(${Background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Change this to set the overlay color and opacity
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              pl: "5rem",
              position: "relative", // Add this to make sure the text is on top of the overlay
              zIndex: 2, // Add this to make sure the text is on top of the overlay
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
            height: "40rem",
            backgroundImage: `url(${Jett})`,
            backgroundPosition: { md: "center" },
            backgroundPositionX: { xs: "", md: "center" },
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Change this to set the overlay color and opacity
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              width: "40%",
              ml: "auto",
              py: "8rem",
              mr: "2rem",
              position: "relative", // Add this to make sure the text is on top of the overlay
              zIndex: 2, // Add this to make sure the text is on top of the overlay
            }}
          >
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
              Join a vast network of like-minded gamers, who are ready to take
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
              position: "relative", // Add this to make sure the text is on top of the overlay
              zIndex: 2, // Add this to make sure the text is on top of the overlay
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
