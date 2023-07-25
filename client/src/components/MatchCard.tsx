import { Avatar, Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Match } from "../interfaces/MatchResponse";

interface MatchDataProps {
  matchData: Match;
  rank: string | undefined;
  rankImage: string | undefined;
}

const MatchCard: FC<MatchDataProps> = ({ matchData, rank, rankImage }) => {
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

  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: "#1B2733",
        display: "flex",
        justifyContent: "space-around",
        my: "3px",
        alignItems: "center",
        border: "1px solid #141414",
      }}
    >
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
    </Grid>
  );
};

export default MatchCard;
