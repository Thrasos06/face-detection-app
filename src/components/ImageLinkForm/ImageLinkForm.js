import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ inputUrl, setInputUrl, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 pa1">
        This magic Brain will detect faces in your picture. Give it a try!
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={(e) => setInputUrl(e.target.value)}
            value={inputUrl}
          />
          <button
            className="w-30 f4 grow link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
