import { Box } from "@mui/material";
import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";

const Teams = () => {
  const [teams, setTeams] = useState({});
  console.log(teams);
  useEffect(() => {
    let ignore = false;

    async function getTeams() {
      const response = await axiosInstance.get("/team/getTeams");
      console.log(response);
      if (ignore === false) {
        setTeams(response.data);
      }
    }

    getTeams();

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <Box sx={{ width: "100%", height: "100vh", backgroundColor: "#101823" }}>
      Teams
    </Box>
  );
};

export default Teams;
