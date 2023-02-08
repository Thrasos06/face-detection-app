import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain-6192.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="tilt-img br2 shadow-2"
        tiltMaxAngleX={35}
        tiltMaxAngleY={35}
        perspective={900}
        scale={1.1}
        transitionSpeed={2000}
        gyroscope={true}
        style={{
          height: "150px",
          width: "150px",
        }}
      >
        <div>
          <img
            src={brain}
            alt="logo"
            style={{ height: "100px", width: "100px" }}
            className="pa3"
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
