import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
// import React from "react";
import { useUserContext } from "../contexts/UserContext";
import { Match } from "../interfaces/MatchResponse";
import StatCard from "../components/StatCard";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();
  console.log(user._id);

  //   const navigate = useNavigate();

  //Overall headshot %, K/D ratio, Winrate calculations
  const matches = user.matches as Match[];
  let kills = 0;
  let deaths = 0;
  let wins = 0;
  let headshots = 0;
  let total = 0;
  let damage = 0;
  console.log(user.matches);
  matches.forEach((match) => {
    headshots += match.playerStats.headshots;
    total +=
      match.playerStats.headshots +
      match.playerStats.legshots +
      match.playerStats.bodyshots;
    kills += match.playerStats.kills;
    deaths += match.playerStats.deaths;
    if (
      (match.blueWon.has_won && match.team === "Blue") ||
      (match.redWon.has_won && match.team === "Red")
    ) {
      wins += 1;
    }
    damage += match.adr;
  });
  //rounds to nearest hundredth place and puts it in percent form
  const headshotPercentTotal = Math.round(1000 * (headshots / total)) / 10;
  const kd = Math.round((kills / deaths) * 100) / 100;

  //rounding these to nearest tenths
  const winrate = Math.round((wins / 5) * 10) * 10;
  const adr = Math.round((damage / 5) * 10) / 10;
  const stats = [
    { name: "Damage/Round", value: adr },
    { name: "Headshot %", value: headshotPercentTotal },
    { name: "K/D Ratio", value: kd },
    { name: "Win %", value: winrate },
  ];

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
        <Box sx={{ width: "100%", height: "200px", backgroundColor: "white" }}>
          <Grid container spacing={2}>
            {stats.map((stat) => (
              <StatCard name={stat.name} value={stat.value} />
            ))}
          </Grid>
          <Grid></Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;