import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Match } from "../interfaces/MatchResponse";
import StatCard from "../components/StatCard";
import MatchCard from "../components/MatchCard";
import { useEffect, useMemo, useState } from "react";
import getProfileData from "../utils/GetUserData";
import { useParams } from "react-router-dom";
import { ProfileResponse } from "../interfaces/Response";
import Review from "../components/Review";
import { calculateStatistics } from "../hooks/calculateStatistics";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [profileData, setProfileData] = useState<ProfileResponse>();
  const [ign, setIgn] = useState<string>("");
  const [pageShow, setPageShown] = useState("Stats"); //used to toggle between pages when on mobile

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

  const stats = useMemo(() => calculateStatistics(matches), [matches]);

  return (
    <Box component={"main"} sx={{ backgroundColor: "#0F141A", height: "100%" }}>
      <Box
        sx={{
          height: { xs: "15vh", md: "35vh" }, // Set the height of the box to 35% of the viewport height
          background: `url("https://trackercdn.com/cdn/tracker.gg/valorant/images/heroes/hero-reyna.jpg?v=1")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Container
        sx={{
          display: "flex",
          gap: { xs: 2, md: 7 },
          alignItems: "center",
          // justifyContent: "center",
          mb: { xs: "0px", md: "20px" },
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
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            component="span"
            sx={{ color: "white", fontFamily: "Poppins" }}
          >
            {ign.split("#")[0]}
          </Typography>
          <Typography
            variant="h6"
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

      {/* Buttons to cycle between stats and review pages when screen size is xtra small */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          mb: "15px",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {pageShow === "Reviews" ? (
          <Button
            onClick={() => setPageShown("Stats")}
            sx={{
              backgroundColor: "#FF4654",
              color: "white",
              width: "90px",
              padding: "8px 15px",
              fontFamily: "Poppins",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#660001",
              },
            }}
          >
            Stats
          </Button>
        ) : (
          <Button
            onClick={() => setPageShown("Stats")}
            sx={{
              backgroundColor: "#660001",
              color: "white",
              width: "90px",
              padding: "8px 15px",
              fontFamily: "Poppins",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#660001",
              },
            }}
          >
            Stats
          </Button>
        )}

        {pageShow === "Stats" ? (
          <Button
            onClick={() => setPageShown("Reviews")}
            sx={{
              backgroundColor: "#FF4654",
              color: "white",
              width: "90px",
              padding: "8px 15px",
              fontFamily: "Poppins",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#660001",
              },
            }}
          >
            Reviews
          </Button>
        ) : (
          <Button
            onClick={() => setPageShown("Reviews")}
            sx={{
              backgroundColor: "#660001",
              color: "white",
              width: "90px",
              padding: "8px 15px",
              fontFamily: "Poppins",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#660001",
              },
            }}
          >
            Reviews
          </Button>
        )}
      </Box>

      {/* container for rank, data, reviews, and match history */}
      <Container maxWidth="xl" sx={{ display: "flex", gap: 4 }}>
        <Box
          sx={{
            width: "400px",
            height: "100%",
            pb: "2rem",
            backgroundColor: "#1B2733",
            display: { xs: "none", md: "block" },
          }}
        >
          {id && <Review id={id} />}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#0F141A",
            display: { xs: "none", md: "block" },
          }}
        >
          <Grid container spacing={2} sx={{ mb: "2rem" }}>
            {stats.map((stat) => (
              <StatCard key={stat.name} name={stat.name} value={stat.value} />
            ))}
          </Grid>
          <Grid container>
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

        {/* Determines which page is shown on smaller screens, reviews or stats */}
        {pageShow === "Stats" ? (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              backgroundColor: "#0F141A",
              display: { xs: "block", md: "none" },
            }}
          >
            <Grid container spacing={2} sx={{ mb: "2rem" }}>
              {stats.map((stat) => (
                <StatCard key={stat.name} name={stat.name} value={stat.value} />
              ))}
            </Grid>
            <Grid container>
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
        ) : (
          <Box
            sx={{
              width: "400px",
              height: "100%",
              pb: "2rem",
              margin: "auto",
              backgroundColor: "#1B2733",
              display: { xs: "block", md: "none" },
            }}
          >
            {id && <Review id={id} />}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
