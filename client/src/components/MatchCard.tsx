import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { Match } from "../interfaces/MatchResponse";
interface MatchDataProps {
  matchData: Match;
}

const MatchCard: FC<MatchDataProps> = ({ matchData }) => {
  return (
    <Grid item xs={12}>
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
      </Box>
      <Box></Box>
    </Grid>
  );
};

export default MatchCard;
