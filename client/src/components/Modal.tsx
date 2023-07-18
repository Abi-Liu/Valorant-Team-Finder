import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axiosInstance from "../utils/axios";
import { TeamInterface } from "../interfaces/TeamInterface";
import { useUserContext } from "../contexts/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ setTeams }) {
  const { user, setUser } = useUserContext();
  const [teamName, setTeamName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(event.target.value);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const team = await axiosInstance.post("/team/createTeam", { teamName });
      console.log(team);
      setTeams((prev) => [...prev, team.data]);
      setUser((prev) => ({
        ...prev,
        team: team.data._id,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        sx={{
          backgroundColor: "#FF4654",
          color: "white",
          padding: "4px 10px",
          fontFamily: "Poppins",
          width: "30%",
          fontWeight: "400",
          "&:hover": {
            backgroundColor: "#c6000f",
          },
          border: "1px solid",
          borderColor: "white",
        }}
        onClick={handleOpen}
      >
        Create Team
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={submit} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a New Team
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <TextField
            id="teamname"
            label="Team Name"
            type="text"
            value={teamName}
            onChange={onChange}
          />
          <Button
            disabled={Boolean(user?.team)}
            variant="contained"
            sx={{
              backgroundColor: "#FF4654",
              color: "white",
              padding: "4px 10px",
              fontFamily: "Poppins",
              width: "30%",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#c6000f",
              },
              border: "1px solid",
              borderColor: "white",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
