import { useState, createContext } from "react";
import "./App.css";
import Dashboard from "../Dashboard/Dashboard.js";
import Login from "../Login/Login.js";
import LoginCallback from "../Login/LoginCallback";

function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export const ThemeContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((t) => (t == "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    setAccessToken(null);
  };

  let componentToRender = <></>;

  if (accessToken) componentToRender = <Dashboard accessToken={accessToken} />;
  else if (!accessToken && !getHashParams()["access_token"])
    componentToRender = <Login />;
  else if (!accessToken && getHashParams()["access_token"])
    componentToRender = (
      <LoginCallback setAccessToken={setAccessToken} params={getHashParams()} />
    );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        {componentToRender}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
