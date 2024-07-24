import "./App.css";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import background from "./background.jpg";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      setIsLoggedIn(true);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const backgroundStyles = {
    backgroundImage: `url(https://images.ctfassets.net/swt2dsco9mfe/2zTQfxWw5vduhqHMGVMJKT/9c64c2a3249356276293a36da4dbf5f0/2560x1600-terrain-wa.jpg)`,
    height: "100vh",
    width: "auto",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const profileIconStyles = {
    position: "absolute",
    top: "20px",
    right: "20px",
  };

  return (
    <div style={backgroundStyles}>
      <div style={profileIconStyles}>
        {profile ? <img style={{ width: "40px", height: "40px", borderRadius: "50%"}} src={profile.picture} alt="user image" /> : ""}
      </div>
      {isLoggedIn ? (
        <div>
          <h1>You're logged in</h1>
        </div>
      ) : (
        <div id="card">
          <div id="card-content">
            <div id="card-title">
              <h2>READY TO BEGIN YOUR ADVENTURE?</h2>
              <div class="underline-title"></div>
            </div>
            <button id="submit-btn" type="submit" name="submit" onClick={login}>
              LOGIN WITH GMAIL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
