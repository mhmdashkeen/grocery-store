import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut } from "@firebase/auth";
import { auth } from "./../firebase-config";

function HeaderNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const loggedInUser = useSelector(state => state.loggedInUser);

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

  const logout = () => {
    signOut(auth);
    sessionStorage.removeItem("userData");
    location.href = "/";
  }

  console.log("Logged IN", loggedInUser);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {loggedInUser?.isAdmin && <MenuItem onClick={() => {
                handleCloseNavMenu();
                navigate("/add");
                }
              }>
                <Typography sx={{ textAlign: 'center' }}>Add products</Typography>
              </MenuItem>}
              <MenuItem onClick={() => {
                handleCloseNavMenu();
                navigate("/");
                }
              }>
                <Typography sx={{ textAlign: 'center' }}>Products</Typography>
              </MenuItem>
              {!loggedInUser && <><MenuItem onClick={() => {
                handleCloseNavMenu();
                navigate("/signup");
                }
              }>
                <Typography sx={{ textAlign: 'center' }}>SignUp</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                handleCloseNavMenu();
                navigate("/login");
                }
              }>
                <Typography sx={{ textAlign: 'center' }}>Login</Typography>
              </MenuItem></>}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}
            {/* <Link to="/add">
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Add products
              </Button>
            </Link> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => navigate("/add")}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Add products
            </Button>
            <Button
              onClick={() => navigate("/")}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Products
            </Button>
          </Box>
            {!loggedInUser && <><Button
              onClick={() => navigate("/login")}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              SignUp
            </Button></>}
            {loggedInUser && (<>{loggedInUser.photoURL ? <img src={loggedInUser.photoURL} alt="Avatar" style={{width: "38px", height: "38px", borderRadius: "50%", marginLeft: "8px", cursor: "pointer"}} onClick={handleOpenUserMenu}/> : <Avatar onClick={handleOpenUserMenu}/>}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={anchorElUser}
              onClose={handleCloseUserMenu}
            >
                {loggedInUser.displayName ? <Typography sx={{ padding: '6px 16px' }}>{loggedInUser.displayName}</Typography> : ""}
                <Typography sx={{ padding: '6px 16px' }}>{loggedInUser.email}</Typography>
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  logout();
                  }
                  }>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
            </Menu></>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderNav;
