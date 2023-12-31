import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { FC, Dispatch, SetStateAction } from "react";
import { TeamInterface } from "../interfaces/TeamInterface";
import axiosInstance from "../utils/axios";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface TeamItemProps {
  team: TeamInterface;
  setTeams: Dispatch<SetStateAction<TeamInterface[]>>;
  teams: TeamInterface[];
}

const Team: FC<TeamItemProps> = ({ team, setTeams, teams }) => {
  const { user, setUser } = useUserContext();

  const navigate = useNavigate();

  //Join team
  async function joinTeam() {
    try {
      const response = await axiosInstance.put(`/team/join/${team._id}`);
      console.log(response);

      //sets the team to the user context
      setUser((prev) => ({
        ...prev,
        team: response.data._id,
      }));

      // Find the index of the team in the current teams state array
      const teamIndex = teams.findIndex((t) => t._id === response.data._id);

      if (teamIndex !== -1) {
        // If the team is found in the current teams state, update it
        const updatedTeams = [...teams];
        updatedTeams[teamIndex] = response.data;
        setTeams(updatedTeams);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Leave Team
  async function leaveTeam() {
    try {
      const response = await axiosInstance.put(`/team/leave/${team._id}`);
      console.log(response);
      //sets the user context team back to an empty string
      setUser((prev) => ({
        ...prev,
        team: "",
      }));

      // Find the index of the team in the current teams state array
      const teamIndex = teams.findIndex((t) => t._id === team._id);

      if (teamIndex !== -1) {
        // If the team is found in the current teams state, update it
        const updatedTeams = [...teams];
        //checks to see if team has disbanded due to no one being in the team
        if (response.data.message === "Team disbanded") {
          //removes the team from state array
          updatedTeams.splice(teamIndex, 1);
          setTeams(updatedTeams);
        } else {
          updatedTeams[teamIndex] = response.data;
          setTeams(updatedTeams);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            component="span"
            sx={{ fontFamily: "Poppins", fontSize: "20px" }}
            gutterBottom
          >
            Team:
          </Typography>
          <Typography
            component="span"
            sx={{ fontFamily: "Poppins", mx: "10px" }}
            gutterBottom
          >
            {team.name}
          </Typography>
          {team.teammates.map((teammate) => (
            <Typography
              onClick={() => navigate(`/profile/${teammate.userId}`)}
              sx={{ fontFamily: "Poppins", cursor: "pointer" }}
              gutterBottom
            >
              {teammate.ign}
            </Typography>
          ))}
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            onClick={user.team === team._id ? leaveTeam : joinTeam}
            sx={{
              backgroundColor: "#FF4654",
              color: "white",
              padding: "4px 10px",
              fontFamily: "Poppins",
              width: "50%",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#c6000f",
              },
              border: "1px solid",
              borderColor: "white",
            }}
          >
            {user.team === team._id ? "Leave Team" : "Join Team"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Team;
