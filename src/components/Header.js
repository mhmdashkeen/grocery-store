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
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "@firebase/auth";
import { auth } from "./../firebase-config";
import Drawer from "../common/Drawer";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}));

function HeaderNav() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const carts = useSelector((state) => state.cart);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    signOut(auth);
    sessionStorage.removeItem("userData");
    location.href = "/";
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={open} closeDrawer={toggleDrawer} />
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              position: { xs: "absolute", md: "static" },
              left: { xs: "50%", md: "unset" },
              transform: { xs: "translateX(-50%)", md: "none" }
            }}
          >
            <AdbIcon sx={{ display: { md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              LOGO
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {loggedInUser?.isAdmin && (
              <>
                <Button
                  onClick={() => navigate("/add")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Add products
                </Button>
                <Button
                  onClick={() => navigate("/adminOrders")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  All Orders
                </Button>
                <Button
                  onClick={() => navigate("/users")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  All Users
                </Button>
              </>
            )}
            <Button
              onClick={() => navigate("/")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Products
            </Button>
            {loggedInUser && (
              <Button
                onClick={() => navigate("/orders")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                My Orders
              </Button>
            )}
          </Box>
          {carts.length > 0 ? (
            <IconButton
              aria-label="cart"
              sx={{ color: "white" }}
              onClick={() => navigate("/cart")}
            >
              <StyledBadge badgeContent={carts.length} color="primary">
                <ShoppingCartOutlinedIcon />
              </StyledBadge>
            </IconButton>
          ) : (
            <IconButton
              aria-label="cart"
              sx={{ color: "white" }}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartOutlinedIcon />
            </IconButton>
          )}
          {!loggedInUser && (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  my: 2,
                  color: "white",
                  display: { xs: "none", md: "block" }
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                sx={{
                  my: 2,
                  color: "white",
                  display: { xs: "none", md: "block" }
                }}
              >
                SignUp
              </Button>
            </>
          )}
          {loggedInUser && (
            <>
              {loggedInUser.photoURL ? (
                <img
                  src={loggedInUser.photoURL}
                  alt="Avatar"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    marginLeft: "8px",
                    cursor: "pointer"
                  }}
                  onClick={handleOpenUserMenu}
                />
              ) : (
                <Avatar onClick={handleOpenUserMenu} />
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={anchorElUser}
                onClose={handleCloseUserMenu}
              >
                {loggedInUser.displayName ? (
                  <Typography sx={{ padding: "6px 16px" }}>
                    {loggedInUser.displayName}
                  </Typography>
                ) : (
                  ""
                )}
                <Typography sx={{ padding: "6px 16px" }}>
                  {loggedInUser.email}
                </Typography>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    logout();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderNav;
