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

  return (
    <Grid item xs={12} sx={{ backgroundColor: "#1B2733" }}>
      <Box sx={{ display: "flex" }}>
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
      <Box></Box>
    </Grid>
  );
};

export default MatchCard;
