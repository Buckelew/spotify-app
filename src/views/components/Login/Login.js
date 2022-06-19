import React from "react";

function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const Login = () => {
  const stateKey = "spotify_auth_state";

  const scope =
    "user-library-read user-read-private user-top-read user-read-recently-played";

  const handleLogin = async (e) => {
    e.preventDefault();

    var client_id = process.env.REACT_APP_CLIENT_ID;
    var redirect_uri = process.env.REACT_APP_REDIRECT;

    var state = generateRandomString(16);

    localStorage.setItem(stateKey, JSON.stringify(state));

    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);

    window.location.href = url;
  };

  return (
    <div className="Login">
      <a onClick={handleLogin}>Login</a>
    </div>
  );
};

export default Login;
