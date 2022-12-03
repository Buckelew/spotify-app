import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginCallback = ({ params, setAccessToken }) => {
  const { state, access_token } = params;
  const storedState = JSON.parse(localStorage.getItem("spotify_auth_state"));

  if (access_token && (state == null || state !== storedState)) {
    alert("There was an error during the authentication");
  } else {
    if (access_token) {
      setAccessToken(access_token);
    }
  }

  // clear hash from URL
  window.history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );

  return <div className="LoginCallback"></div>;
};

export default LoginCallback;
