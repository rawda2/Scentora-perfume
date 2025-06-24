import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../Context/UserContext";
const pages = ["Home", "Products", "Favourite"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { logout } = React.useContext(UserContext);
  function handleLogout() {
    logout();
    navigate("/login");
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    const path = `/${page.toLowerCase()}`;
    navigate(path);
    handleCloseNavMenu(); // close menu on small screens
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <AppBar position="fixed" id="navBar">
      <Container maxWidth="xl" className="Nav ">
        <Toolbar disableGutters>
          <LocalMallIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            className="logo"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            className="logoName"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              fontSize: "1.5rem",
            }}
            onClick={() => handleNavigate("home")}
          >
            Scentora
          </Typography>

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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ color: "#ff4081" }}
                >
                  <Typography
                    className="menuItem"
                    onClick={() => handleNavigate(page)}
                    sx={{
                      textAlign: "center",
                      color: "#9c6f6f",
                      size: 20,
                    }}
                  >
                    {" "}
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalMallIcon
            sx={{ display: { xs: "felx", md: "none" }, mr: 1 }}
            className="logo"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            className="logoName"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 3,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              fontSize: "1.5rem",
            }}
            onClick={() => handleNavigate("home")}
          >
            Scentora
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className=" ms-5"
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{
                  my: 2,
                  color: "#9c6f6f",
                  display: "block",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
                className=" mt-3 ms-3"
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton aria-label="cart" onClick={() => handleNavigate("cart")}>
            <StyledBadge
              badgeContent={totalQuantity}
              color="warning"
              className=" me-4 bg"
            >
              <ShoppingCartIcon
                className="menuItem"
                sx={{ fontSize: "1.8rem" }}
              />
            </StyledBadge>
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, fontSize: "1.1rem" }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting == "Logout" ? (
                    <Typography
                      onClick={() => {
                        handleLogout();
                      }}
                      sx={{ textAlign: "center", color: "#9c6f6f" }}
                    >
                      {setting}
                    </Typography>
                  ) : (
                    <Typography
                      onClick={() => {
                        handleNavigate("dash");
                      }}
                      sx={{ textAlign: "center", color: "#9c6f6f" }}
                    >
                      {setting}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
