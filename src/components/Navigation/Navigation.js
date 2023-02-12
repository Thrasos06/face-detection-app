import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
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
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "end" }}>
        <button
          className="f3 link dim black underline pa3 pointer "
          onClick={() => onRouteChange("signIn")}
        >
          Sign In
        </button>
        <button
          className="f3 link dim black underline pa3 pointer "
          onClick={() => onRouteChange("register")}
        >
          Register
        </button>
      </nav>
    );
  }
};

export default Navigation;
