import { Box, Grid } from "@mui/material";
import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import BasicModal from "../components/Modal";
import { TeamInterface } from "../interfaces/TeamInterface";
import Team from "../components/Team";
import CustomAlert from "../components/CustomAlert";

const Teams = () => {
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  console.log(teams);

  useEffect(() => {
    let ignore = false;

    async function getTeams() {
      try {
        const response = await axiosInstance.get("/team/getTeams");
        console.log(response);
        if (!ignore) {
          setTeams(response.data);
        }
      } catch (error: any) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }

    getTeams();

    return () => {
      ignore = true;
    };
  }, []);

  function handleRender() {
    setError("");
  }

  return (
    <Box
      component="main"
      sx={{ width: "100%", height: "100vh", backgroundColor: "#101823" }}
    >
      {error && (
        <CustomAlert
          severity="error"
          duration={5000}
          message={error}
          onRender={handleRender}
        />
      )}
      <Box
        sx={{
          py: "5rem",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <BasicModal setTeams={setTeams} setError={setError} />
      </Box>
      <Grid container spacing={4} sx={{ px: "1.5rem" }}>
        {loading ? (
          <div>Loading...</div>
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
