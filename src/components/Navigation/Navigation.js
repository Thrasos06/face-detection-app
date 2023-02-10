import React from "react";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "end" }}>
      <button
        className="f3 link dim black underline pa3 pointer "
        onClick={() => onRouteChange("signIn")}
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navigation;
