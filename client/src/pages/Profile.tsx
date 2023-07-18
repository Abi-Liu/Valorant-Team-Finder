import { Avatar, Box, Container, Typography } from "@mui/material";
// import React from "react";
import { useUserContext } from "../contexts/UserContext";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();

  //   const navigate = useNavigate();

  return (
    <Box
      component={"main"}
      sx={{ backgroundColor: "#0F141A", height: "100vh" }}
    >
      <Box
        style={{
          height: "35vh", // Set the height of the box to 20% of the viewport height
          background: `url("https://trackercdn.com/cdn/tracker.gg/valorant/images/heroes/hero-reyna.jpg?v=1")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Container
        sx={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          mb: "20px",
          py: "10px",
        }}
      >
        <Box>
          <Avatar
            src={user.cardSmall}
            alt="Valorant Banner Avatar"
            sx={{
              height: "80px",
              width: "80px",
              border: "3px solid white",
              zIndex: "1",
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="h4"
            component="span"
            sx={{ color: "white", fontFamily: "Poppins" }}
          >
            {user.ign.split("#")[0]}
          </Typography>
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontFamily: "Poppins",
              color: "#dddddd",
              mx: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            #{user.ign.split("#")[1]}
          </Typography>
        </Box>
      </Container>
      {/* container for rank, data, and match history */}
      <Container sx={{ display: "flex", gap: 4 }}>
        <Box
          sx={{ width: "300px", height: "200px", backgroundColor: "white" }}
        ></Box>
        <Box
          sx={{ width: "100%", height: "200px", backgroundColor: "white" }}
        ></Box>
      </Container>
    </Box>
  );
};

export default Profile;
