import { Grid, Card, Typography, CardContent } from "@mui/material";
import { FC } from "react";

interface StatCardProps {
  name: string;
  value: number;
}

const StatCard: FC<StatCardProps> = ({ name, value }) => {
  return (
    <Grid item xs={6} md={3}>
      <Card
        variant="outlined"
        elevation={20}
        sx={{ backgroundColor: "#263747" }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", fontFamily: "Poppins", color: "#d3d3d3" }}
          >
            {name}
          </Typography>
          {name.includes("%") ? (
            <Typography
              variant="h6"
              sx={{ fontFamily: "Poppins", color: "white" }}
            >
              {value}%
            </Typography>
          ) : (
            <Typography
              variant="h6"
              sx={{ fontFamily: "Poppins", color: "white" }}
            >
              {value}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StatCard;
