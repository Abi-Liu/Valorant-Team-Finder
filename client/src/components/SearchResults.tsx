import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import LogoRed from "../assets/LogoRed.svg";
interface SearchResultsProps {
  ign: string;
  _id: string;
}

const SearchResults: FC<SearchResultsProps> = ({ ign, _id }) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/profile/${_id}`)}
      sx={{ cursor: "pointer", display: "flex" }}
    >
      <Box component="img" src={LogoRed} sx={{ height: "30px" }}></Box>
      <Box>
        <Typography>{ign}</Typography>
      </Box>
    </Box>
  );
};

export default SearchResults;
