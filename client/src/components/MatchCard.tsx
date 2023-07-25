import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Match } from "../interfaces/MatchResponse";
import { ExpandMore } from "@mui/icons-material";

interface MatchDataProps {
  matchData: Match;
  rank: string | undefined;
  rankImage: string | undefined;
}

const MatchCard: FC<MatchDataProps> = ({ matchData, rank, rankImage }) => {
  const [show, setShow] = useState(false);
  console.log(matchData);
  //headshot %
  const headshots = matchData.playerStats.headshots;
  const total =
    matchData.playerStats.headshots +
    matchData.playerStats.bodyshots +
    matchData.playerStats.legshots;
  const headshotPercent = Math.round(100 * (headshots / total));

  //K/D Ratio
  const kills = matchData.playerStats.kills;
  const deaths = matchData.playerStats.deaths;
  const kd = Math.round((kills / deaths) * 10) / 10;
  let wonRounds = 0;
  let lostRounds = 0;
  if (matchData.team === "Blue") {
    wonRounds = matchData.blueWon.rounds_won;
    lostRounds = matchData.blueWon.rounds_lost;
  } else {
    wonRounds = matchData.redWon.rounds_won;
    lostRounds = matchData.redWon.rounds_lost;
  }

  function showDetails() {
    setShow((prev) => !prev);
  }

  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: "#1B2733",
        my: "3px",
        border: "1px solid #141414",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <ExpandMore
          sx={{ color: "white", display: { xs: "block", md: "none" } }}
          onClick={showDetails}
        />
        <Box sx={{ py: "10px" }}>
          <Avatar
            src={matchData.image}
            alt="Agent icon"
            sx={{ width: "48px", height: "48px" }}
          />
        </Box>
        <Box>
          <Typography variant="body1" sx={{ color: "white" }}>
            Competitive
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar src={rankImage} alt="Rank Image" />
          <Typography variant="caption" sx={{ color: "white" }}>
            {rank}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.15rem", color: "#32cd32" }}
          >
            {wonRounds}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.15rem",
              color: "white",
            }}
          >
            :
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.15rem", color: "#ED1C24" }}
          >
            {lostRounds}
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="caption" sx={{ color: "#dddddd" }}>
            K/D/A
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            {matchData.playerStats.kills} / {matchData.playerStats.deaths} /{" "}
            {matchData.playerStats.assists}
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="caption" sx={{ color: "#dddddd" }}>
            K/D
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            {kd}
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="caption" sx={{ color: "#dddddd" }}>
            HS%
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            {headshotPercent}
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="caption" sx={{ color: "#dddddd" }}>
            ADR
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            {Math.round(matchData.adr)}
          </Typography>
        </Box>
      </Box>
      {show && <Divider sx={{ bgcolor: "gray" }} />}
      {show && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            my: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="caption" sx={{ color: "#dddddd" }}>
              K/D/A
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              {matchData.playerStats.kills} / {matchData.playerStats.deaths} /{" "}
              {matchData.playerStats.assists}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="caption" sx={{ color: "#dddddd" }}>
              K/D
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              {kd}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="caption" sx={{ color: "#dddddd" }}>
              HS%
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              {headshotPercent}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="caption" sx={{ color: "#dddddd" }}>
              ADR
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              {Math.round(matchData.adr)}
            </Typography>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default MatchCard;
