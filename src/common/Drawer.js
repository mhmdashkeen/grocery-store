import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TemporaryDrawer({ open, closeDrawer }) {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const navigationFunc = (nav) => {
    closeDrawer(true);
    setTimeout(() => {
      navigate(nav);
    }, 500);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={closeDrawer(false)}>
      <List>
        {loggedInUser?.isAdmin && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigationFunc("/add")}>
                <ListItemText primary={"Add products"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigationFunc("/adminOrders")}>
                <ListItemText primary={"All Orders"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigationFunc("/users")}>
                <ListItemText primary={"All Users"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigationFunc("/")}>
            <ListItemText primary={"Products"} />
          </ListItemButton>
        </ListItem>
        {loggedInUser && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigationFunc("/orders")}>
              <ListItemText primary={"My orders"} />
            </ListItemButton>
          </ListItem>
        )}
        {!loggedInUser && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigationFunc("/signup")}>
                <ListItemText primary={"Sign up"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigationFunc("/login")}>
                <ListItemText primary={"Login"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={closeDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}
