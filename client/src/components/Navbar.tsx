import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoWhite from "../assets/LogoWhite.svg";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { setUser, setLoggedIn, user, loggedIn } = useUserContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  async function logout(): Promise<void> {
    setUser({
      _id: "",
      ign: "",
      team: "",
      cardSmall: "",
      cardLarge: "",
      rank: "",
      rankImage: "",
      puuid: "",
      region: "",
      matches: [],
    });
    setLoggedIn(false);
    setAnchorElUser(null);
    window.open("https://valorantfinder.onrender.com/auth/logout", "_self");
  }

  const pages = loggedIn
    ? [
        { text: "Active Teams", click: () => navigate("/teams") },
        { text: "Search Users", click: () => navigate("/search") },
        // { text: "Shop", click: () => navigate("/shop") },
      ]
    : [
        { text: "Login", click: () => navigate("/login") },
        { text: "Signup", click: () => navigate("/signup") },
      ];
  const settings = [
    {
      text: "Profile",
      click: () => {
        setAnchorElUser(null);
        navigate(`/profile/${user._id}`);
      },
    },
    { text: "Logout", click: logout },
  ];

  return (
    <AppBar sx={{ backgroundColor: "black" }} position="fixed">
      <Box px="2rem">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <a></a>
          <Box
            component="img"
            onClick={() => navigate("/")}
            sx={{
              height: 50,
              display: { xs: "none", md: "flex" },
              mr: 1,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            alt="Valorant logo."
            src={LogoWhite}
          />
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page: { text: string; click: () => void }) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Button
                      sx={{ fontFamily: "Poppins", color: "black" }}
                      onClick={page.click}
                    >
                      {page.text}
                    </Button>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Box
            component="img"
            sx={{
              height: 50,
              display: { xs: "flex", md: "none" },
              mr: 1,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            alt="Valorant logo."
            src={LogoWhite}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Poppins",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: { text: string; click: () => void }) => (
              <Button
                key={page.text}
                onClick={page.click}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "Poppins",
                }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
          {!loggedIn ? (
            ""
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Valorant Banner"
                    src={user.cardSmall}
                    sx={{ border: "1px solid white" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(
                  (setting: { text: string; click: () => void }) => (
                    <MenuItem key={setting.text} onClick={setting.click}>
                      <Typography
                        textAlign="center"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {setting.text}
                      </Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
