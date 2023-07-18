import { Card, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { TeamInterface } from "../interfaces/TeamInterface";

interface TeamItemProps {
  team: TeamInterface;
}

const Team: FC<TeamItemProps> = ({ team }) => {
  return (
    <Grid item key={team._id} sx={{ minWidth: "275px" }}>
      <Card variant="outlined">
        <Typography sx={{ fontFamily: "Poppins" }} gutterBottom>
          {team.name}
        </Typography>
        <Typography sx={{ fontFamily: "Poppins" }} gutterBottom>
          {team.teammates}
        </Typography>
      </Card>
    </Grid>
  );
};

export default Team;
