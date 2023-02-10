import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";
import SignIn from "./components/SignIn/SignIn";

console.log(Clarifai);

// const app = new Clarifai.App({
//   apiKey: "API_KEY",
// });

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [displaySignForm, setDisplaySignForm] = useState("singIn");
  const onButtonSubmit = () => {
    console.log("click");
    // app.models
    //   .predict(
    //     {
    //       id: "face-detection",
    //       name: "Face",
    //       version: "6dc7e46bc9124c5c8824be4822abe105",
    //       type: "visual-detector",
    //     },
    //     inputUrl
    //   )
    //   .then(
    //     function (response) {
    //       console.log(response);
    //     },
    //     function (err) {}
    //   );
  };

  const onRouteChange = (route) => {
    setDisplaySignForm(route);
  };

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} />
      <Logo />
      {displaySignForm === "signIn" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <div>
          <Rank />
          <ImageLinkForm
            inputUrl={inputUrl}
            setInputUrl={setInputUrl}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition inputUrl={inputUrl} />
          <ParticlesBg type="cobweb" bg={true} />
        </div>
      )}
    </div>
  );
}

export default App;
