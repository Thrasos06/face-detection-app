import React from "react";

const FaceRecognition = ({ inputUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={inputUrl} alt="face-detect" style={{ width: "400px" }} />
      </div>
    </div>
  );
};

export default FaceRecognition;
