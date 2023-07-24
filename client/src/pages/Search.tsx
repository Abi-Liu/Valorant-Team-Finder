import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
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

  async function searchUsers() {
    try {
      const response = await axiosInstance.get(`/search/${searchTerm}`);
      console.log(response);
      setPlayersData(response.data);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

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
      }}
    >
      <Paper component="form" sx={{ width: "40%" }}>
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
          {players.map((player) => (
            <ListItem key={player._id} button>
              <Box component="img" src={LogoRed} sx={{ height: "30px" }}></Box>
              <ListItemText primary={player.ign} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Search;
