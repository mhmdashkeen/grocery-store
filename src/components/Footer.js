import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div
      className="bg-dark"
      style={{
        color: "#fff",
        minHeight: "55px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      Copyright © {year} - Ecommerce INC.
    </div>
  );
};

export default React.memo(Footer);
