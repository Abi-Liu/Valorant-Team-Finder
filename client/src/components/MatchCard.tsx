import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { Match } from "../interfaces/MatchResponse";
import { ProfileResponse } from "../interfaces/Response";

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

  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: "#1B2733",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box>
          <Avatar
            src={matchData.image}
            alt="Agent icon"
            sx={{ width: "48px", height: "48px" }}
          />
        </Box>
        <Box>
          <Typography variant="body1">Competitive</Typography>
        </Box>
        <Box>
          <Avatar src={rankImage} alt="Rank Image" />
          <Typography variant="caption">{rank}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box>
          <Typography variant="caption">K/D/A</Typography>
          <Typography variant="body1">
            {matchData.playerStats.kills}/{matchData.playerStats.deaths}/
            {matchData.playerStats.assists}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">K/D</Typography>
          <Typography variant="body1">{kd}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">HS%</Typography>
          <Typography variant="body1">{headshotPercent}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">ADR</Typography>
          <Typography variant="body1">{Math.round(matchData.adr)}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default MatchCard;
