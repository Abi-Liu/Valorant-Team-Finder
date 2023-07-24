import { Box, ListItem, ListItemText } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import LogoRed from "../assets/LogoRed.svg";
interface SearchResultsProps {
  ign: string;
  _id: string;
}

const SearchResults: FC<SearchResultsProps> = ({ ign, _id }) => {
  const navigate = useNavigate();
  return (
    <ListItem button onClick={() => navigate(`/profile/${_id}`)}>
      <Box component="img" src={LogoRed} sx={{ height: "30px" }}></Box>
      <ListItemText primary={ign} />
    </ListItem>
  );
};

export default SearchResults;
