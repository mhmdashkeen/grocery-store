import React from "react";
import { useSelector } from "react-redux";

function AllUsers() {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  if (!loggedInUser.isAdmin) {
    return <h1>You are not authorized to access this page.</h1>;
  }
  return (
    <>
      <h1>Users</h1>
    </>
  );
}

export default AllUsers;
