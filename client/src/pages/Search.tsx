import { Box, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import LogoRed from "../assets/LogoRed.svg";
import axiosInstance from "../utils/axios";

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
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  if (searchTerm.length >= 3) {
    searchUsers();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setsearchTerm(event.target.value);
  }

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: "4px",
        pt: "4rem",
        bgcolor: "#0F141A",
      }}
    >
      {/* Box with the logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          bgcolor: "black",
        }}
      >
        <img
          src={LogoRed}
          alt="Logo"
          style={{ height: "40px", width: "40px" }}
        />
      </Box>

      {/* Search bar */}
      <TextField
        variant="outlined"
        placeholder="Search Players"
        fullWidth
        value={searchTerm}
        onChange={handleChange}
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <SearchIcon color="action" />
        //     </InputAdornment>
        //   ),
        // }}
        sx={{ backgroundColor: "white", width: "40%" }}
      />
    </Box>
  );
};

export default Search;
