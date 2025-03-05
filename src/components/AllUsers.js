import { Box, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../slice/ManageUsers";
import ScreenLoader from "./ScreenLoader";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAuth } from "firebase/auth";

function AllUsers() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const users = useSelector((state) => state.users);
  const handleDeleteUser = (uid) => {
    getAuth()
    .deleteUser(uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
    console("UID", uid);
  }

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (!loggedInUser.isAdmin) {
    return <h1>You are not authorized to access this page.</h1>;
  }
  return (
    <Box>
      <h1>Users</h1>
      {users.loading && <ScreenLoader inline="inline" />}
      {users.userLists.map(user => (
        <div key={user.id} style={{ position: "relative" }}>
            <div style={{ display: "flex" }}>
                {user.photoURL && (
                    <div style={{ marginRight: "10px" }}>
                        <img style={{ width: "80px", height: "80px", border: "1px solid #eee", borderRadius: "2px" }} src={user.photoURL} />
                    </div>
                )}
                <div>
                    <div><b>{user.displayName}</b></div>
                    <div>{user.email}</div>
                </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "#fff",
                borderRadius: "2px",
                zIndex: "2",
                boxShadow:
                  "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"
              }}
            >
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => handleDeleteUser(user.uid)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
        </div>
      ))}
    </Box>
  );
}

export default AllUsers;
