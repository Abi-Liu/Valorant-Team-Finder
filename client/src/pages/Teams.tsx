import { Box, Grid } from "@mui/material";
import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import BasicModal from "../components/Modal";
import { TeamInterface } from "../interfaces/TeamInterface";
import Team from "../components/Team";

const Teams = () => {
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function getTeams() {
      try {
        const response = await axiosInstance.get("/team/getTeams");
        console.log(response);
        if (!ignore) {
          setTeams(response.data);
        }
      } catch (error) {
        setError("Failed to fetch teams.");
      } finally {
        setLoading(false);
      }
    }

    getTeams();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Box
      component="main"
      sx={{ width: "100%", height: "100vh", backgroundColor: "#101823" }}
    >
      <Box
        sx={{
          py: "5rem",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <BasicModal setTeams={setTeams} />
      </Box>
      <Grid container spacing={4} sx={{ px: "1.5rem" }}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          teams.map((team) => (
            <Team
              key={team._id}
              setTeams={setTeams}
              team={team}
              teams={teams}
            />
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Teams;
