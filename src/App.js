import "./App.css";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import background from "./background.jpg";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
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
    // margin: "0px auto",
    height: "100vh",
    // width: "100vw",
    // marginTop: "-70px",
    // fontSize: "100px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
};
  return (
    <div style={backgroundStyles} className="App">
      <header>
      </header>
      <div style={{ paddingTop: "20px"}}>
        <h2>React Google Login</h2>
        {profile ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={login}>Sign in with Google 🚀 </button>
        )}
      </div>
    </div>
  );
}

export default App;
