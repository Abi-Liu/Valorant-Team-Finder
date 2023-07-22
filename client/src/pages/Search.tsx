import { Box, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState } from "react";
import LogoRed from "../assets/LogoRed.svg";

const Search = () => {
  const [searchData, setSearchData] = useState("");

  //   return (
  //     <Box
  //       component="main"
  //       sx={{
  //         backgroundColor: "#0F141A",
  //         height: "100vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "flex-start",
  //         pt: "2rem",
  //       }}
  //     >
  //       <TextField
  //         variant="outlined"
  //         placeholder="Search Players"
  //         fullWidth
  //         InputProps={{
  //           startAdornment: <SearchIcon color="action" />,
  //         }}
  //         sx={{ backgroundColor: "white", width: "50%" }}
  //       />
  //     </Box>
  //   );

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
        placeholder="Search..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ backgroundColor: "white", width: "40%" }}
      />
    </Box>
  );
};

export default Search;
