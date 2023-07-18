import { Avatar, Box, Container, Typography } from "@mui/material";
import React from "react";
import { useUserContext } from "../contexts/UserContext";

const Profile = () => {
  const { user } = useUserContext();
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
      <Container sx={{ display: "flex", gap: 10 }}>
        <Box>
          <Avatar
            src={user.cardSmall}
            alt="Valorant Banner Avatar"
            sx={{ height: "80px", width: "80px", border: "3px solid white" }}
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
          <Box
            sx={{ backgroundColor: "#ffffff", height: "10vh", width: "100vw" }}
          ></Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
