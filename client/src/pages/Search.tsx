import {
  Box,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { ChangeEvent, useEffect, useState } from "react";
import LogoRed from "../assets/LogoRed.svg";
import axiosInstance from "../utils/axios";
import SearchResults from "../components/SearchResults";

interface playersInterface {
  _id: string;
  ign: string;
  cardSmall: string;
}

const Search = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [players, setPlayersData] = useState<playersInterface[] | []>([]);

  useEffect(() => {
    async function searchUsers() {
      try {
        const response = await axiosInstance.get(`/search/${searchTerm}`);
        console.log(response);
        setPlayersData(response.data);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    }
    if (searchTerm.length >= 3) {
      searchUsers();
    }
  }, [searchTerm]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setsearchTerm(event.target.value);
  }

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: "4px",
        pt: "4rem",
        bgcolor: "#0F141A",
        gap: 3,
      }}
    >
      <Typography variant="h4" sx={{ color: "White" }}>
        Find Players
      </Typography>
      <Paper component="form" sx={{ width: { xs: "80%", md: "40%" } }}>
        <Box display="flex" alignItems="center" p={1}>
          <IconButton disabled>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Divider />
        <List>
          {players.length > 0 ? (
            players.map((player) => (
              <SearchResults
                key={player._id}
                ign={player.ign}
                _id={player._id}
              />
            ))
          ) : (
            <ListItem button>
              <Box component="img" src={LogoRed} sx={{ height: "30px" }}></Box>
              <ListItemText primary={"No user found"} />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Search;
