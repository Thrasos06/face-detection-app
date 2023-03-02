import React, { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [displaySignForm, setDisplaySignForm] = useState("signIn");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [data, setData] = useState(null);
  const [box, setBox] = useState({});
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onButtonSubmit = () => {
    //help me => user_id can be found in multiple ways, one way is in https://portal.clarifai.com/settings/profile
    const USER_ID = "8hvxbp9wiihc";

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    // help me => PAT can be found in https://portal.clarifai.com/settings/authentication (create one if necessary!)
    const PAT = "b3d0e5b25ccb482686c41a3104682bac";

    // help me => App Id is just the name of your app on the portal.
    const APP_ID = "face";

    // Change these to whatever model and image input you want to use
    // help me => https://help.clarifai.com/hc/en-us/articles/1500007677141-Where-to-find-your-Model-IDs-and-Model-Version-IDs
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";

    const IMAGE_URL = inputUrl;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({
                ...user,
                entries: count,
              });
            });
        }
        displayFaceBox(calculateFaceLocation(result));
      })

      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route) => {
    setDisplaySignForm(route);
  };

  useEffect(() => {
    if (displaySignForm === "signIn" || displaySignForm === "register") {
      setIsSignedIn(false);
    } else if (displaySignForm === "home") {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(true);
    }
  }, [displaySignForm]);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Logo />
      {displaySignForm === "home" ? (
        <div>
          <Rank user={user} />
          <ImageLinkForm
            inputUrl={inputUrl}
            setInputUrl={setInputUrl}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition inputUrl={inputUrl} box={box} />
          <ParticlesBg type="cobweb" bg={true} />
        </div>
      ) : displaySignForm === "register" ? (
        <Register onRouteChange={onRouteChange} setUser={setUser} />
      ) : (
        <SignIn onRouteChange={onRouteChange} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
