import { Grid, Card, Typography } from "@mui/material";
import React, { FC } from "react";

interface StatCardProps {
  name: string;
  value: number;
}

const StatCard: FC<StatCardProps> = ({ name, value }) => {
  return (
    <Grid item sm={6} md={3}>
      <Card>
        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>
          {name}
        </Typography>
        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>
          {value}
        </Typography>
      </Card>
    </Grid>
  );
};

export default StatCard;
