import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { Match } from "../interfaces/MatchResponse";
import StatCard from "../components/StatCard";
import MatchCard from "../components/MatchCard";
import { useEffect, useState } from "react";
import getProfileData from "../utils/GetUserData";
import { useParams } from "react-router-dom";
import { ProfileResponse } from "../interfaces/Response";
import Review from "../components/Review";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [profileData, setProfileData] = useState<ProfileResponse>();
  const [ign, setIgn] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    async function fetchProfileData() {
      if (!id) {
        // Handle the case where id is undefined or not present in the URL
        console.error("ID not found in URL.");
        return;
      } else {
        if (!ignore) {
          const { profileData, matchHistory } = await getProfileData(id);
          setProfileData(profileData.data.profile);
          setIgn(profileData.data.ign.ign);
          setMatches(matchHistory.data.matches);
        }
      }
    }

    fetchProfileData();

    return () => {
      ignore = true;
    };
  }, [id]);
  //   const navigate = useNavigate();

  //Overall headshot %, K/D ratio, Winrate calculations
  // const matches = user.matches as Match[];
  let kills = 0;
  let deaths = 0;
  let wins = 0;
  let headshots = 0;
  let total = 0;
  let damage = 0;
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
    <Box component={"main"} sx={{ backgroundColor: "#0F141A", height: "100%" }}>
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
          // justifyContent: "center",
          mb: "20px",
          py: "10px",
        }}
      >
        <Box>
          <Avatar
            src={profileData?.cardSmall}
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
            {ign.split("#")[0]}
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
            #{ign.split("#")[1]}
          </Typography>
        </Box>
      </Container>
      {/* container for rank, data, reviews, and match history */}
      <Container maxWidth="xl" sx={{ display: "flex", gap: 4 }}>
        <Box
          sx={{ width: "400px", height: "100vh", backgroundColor: "#1B2733" }}
        >
          {id && <Review id={id} />}
        </Box>
        <Box
          sx={{ width: "100%", height: "100vh", backgroundColor: "#0F141A" }}
        >
          <Grid container spacing={2} sx={{ mb: "2rem" }}>
            {stats.map((stat) => (
              <StatCard key={stat.name} name={stat.name} value={stat.value} />
            ))}
          </Grid>
          <Grid spacing={2}>
            {matches.map((match) => (
              <MatchCard
                key={match._id}
                matchData={match}
                rank={profileData?.rank}
                rankImage={profileData?.rankImage}
              />
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
