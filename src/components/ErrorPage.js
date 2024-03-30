import React from "react";
import notfound from "../../public/assets/img/notfound.png";

const ErrorPage = () => {
  return (
    <div
      style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <img src={notfound} alt="Not found" />
    </div>
  );
};

export default ErrorPage;
