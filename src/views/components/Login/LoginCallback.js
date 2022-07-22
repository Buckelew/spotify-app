import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

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

const LoginCallback = (props) => {
  const params = getHashParams();
  const { state, access_token } = params;
  const storedState = JSON.parse(localStorage.getItem("spotify_auth_state"));

  if (access_token && (state == null || state !== storedState)) {
    alert("There was an error during the authentication");
  } else {
    if (access_token) {
      props.setAccessToken(access_token);
      return <Navigate to="/" />;
    }
  }

  return (
    <div className="LoginCallback">
      <Navigate to="/login" />
    </div>
  );
};

export default LoginCallback;
