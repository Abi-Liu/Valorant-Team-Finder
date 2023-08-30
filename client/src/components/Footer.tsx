import { Box, Link, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PersonIcon from "@mui/icons-material/Person";

const Footer = () => {
  return (
    <Box
      component={"footer"}
      sx={{
        bgcolor: "black",
        display: "flex",
        justifyContent: "center",
        aligntItems: "center",
      }}
    >
      <Box
        sx={{ height: "100px", display: "flex", alignItems: "center", gap: 2 }}
      >
        <Typography sx={{ color: "gray" }}>© 2023 </Typography>
        <Link
          sx={{
            color: "gray",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          href="https://abiliu.netlify.app"
        >
          <PersonIcon sx={{ color: "gray" }} /> Abi Liu
        </Link>
        <Link
          sx={{
            color: "gray",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          href="https://github.com/Abi-Liu"
        >
          <GitHubIcon sx={{ color: "gray" }} /> Github
        </Link>

        <Link
          sx={{
            color: "gray",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          href="https://www.linkedin.com/in/abiliu/"
        >
          <LinkedInIcon sx={{ color: "gray" }} /> LinkedIn
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
