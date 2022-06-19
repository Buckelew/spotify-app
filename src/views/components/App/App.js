import { useState } from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "../Dashboard/Dashboard.js";
import Login from "../Login/Login.js";
import LoginCallback from "../Login/LoginCallback.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [accessToken, setAccessToken] = useState();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard accessToken={accessToken} />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/login/callback"
              exact
              element={<LoginCallback setAccessToken={setAccessToken} />}
            />
            <Route path="/404" element={<h1>Not found :(</h1>} />
            <Route path="/" element={<Navigate replace to="/404" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
